import type {
	IDataObject,
	IHookFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

interface FolkWebhook {
	id: string;
	name: string;
	targetUrl: string;
	subscribedEvents: Array<{ eventType: string }>;
	status: string;
}

async function folkApiRequest(
	this: IHookFunctions | IWebhookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: IDataObject,
): Promise<IDataObject> {
	const options: IHttpRequestOptions = {
		method,
		url: `https://api.folk.app${endpoint}`,
		json: true,
	};

	if (body) {
		options.body = body;
	}

	return await this.helpers.httpRequestWithAuthentication.call(this, 'folkApi', options);
}

export class FolkTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Folk Trigger',
		name: 'folkTrigger',
		icon: { light: 'file:../../icons/folk.svg', dark: 'file:../../icons/folk.dark.svg' },
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["events"].join(", ")}}',
		description: 'Triggers when Folk CRM events occur',
		defaults: {
			name: 'Folk Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'folkApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: [],
				description: 'The events to listen for',
				options: [
					{
						name: 'Company Created',
						value: 'company.created',
					},
					{
						name: 'Company Deleted',
						value: 'company.deleted',
					},
					{
						name: 'Company Updated',
						value: 'company.updated',
					},
					{
						name: 'Object Created',
						value: 'object.created',
					},
					{
						name: 'Object Deleted',
						value: 'object.deleted',
					},
					{
						name: 'Object Updated',
						value: 'object.updated',
					},
					{
						name: 'Person Created',
						value: 'person.created',
					},
					{
						name: 'Person Deleted',
						value: 'person.deleted',
					},
					{
						name: 'Person Updated',
						value: 'person.updated',
					},
				],
			},
		],
		usableAsTool: true,
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const webhookData = this.getWorkflowStaticData('node');

				// Get all webhooks from Folk
				const response = (await folkApiRequest.call(this, 'GET', '/v1/webhooks')) as {
					data: { items: FolkWebhook[] };
				};
				const webhooks = response.data?.items || [];

				// Check if any webhook matches our URL
				for (const webhook of webhooks) {
					if (webhook.targetUrl === webhookUrl) {
						// Found existing webhook, store its ID
						webhookData.webhookId = webhook.id;
						return true;
					}
				}

				return false;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const webhookData = this.getWorkflowStaticData('node');
				const events = this.getNodeParameter('events') as string[];

				// Build subscribed events array
				const subscribedEvents = events.map((eventType) => ({ eventType }));

				// Create webhook in Folk
				const body: IDataObject = {
					name: `n8n Workflow Webhook`,
					targetUrl: webhookUrl,
					subscribedEvents,
				};

				const response = (await folkApiRequest.call(this, 'POST', '/v1/webhooks', body)) as {
					data: { id: string };
				};

				if (response.data?.id) {
					webhookData.webhookId = response.data.id;
					return true;
				}

				return false;
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId) {
					try {
						await folkApiRequest.call(
							this,
							'DELETE',
							`/v1/webhooks/${webhookData.webhookId}`,
						);
					} catch {
						// Webhook may have been deleted manually, ignore error
						return false;
					}

					delete webhookData.webhookId;
				}

				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const body = req.body as IDataObject;

		// Return the Folk event data to the workflow
		return {
			workflowData: [this.helpers.returnJsonArray(body)],
		};
	}
}
