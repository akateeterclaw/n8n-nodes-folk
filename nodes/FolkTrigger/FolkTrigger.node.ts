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

import { getGroups } from '../Folk/methods/loadOptions';

interface FolkWebhook {
	id: string;
	name: string;
	targetUrl: string;
	subscribedEvents: Array<{ eventType: string; filter?: IDataObject }>;
	status: string;
}

interface FolkWebhookChange {
	path?: string[];
	type?: string;
	value?: Array<{ id?: string }>;
}

const GROUP_ADDED_EVENT = 'person.group_added';
const GROUP_REMOVED_EVENT = 'person.group_removed';
const GROUPS_UPDATED_EVENT = 'person.groups_updated';

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

function buildSubscribedEvents(this: IHookFunctions): Array<{ eventType: string; filter?: IDataObject }> {
	const events = this.getNodeParameter('events') as string[];
	const subscribedEvents: Array<{ eventType: string; filter?: IDataObject }> = [];

	for (const eventType of events) {
		if (eventType === GROUP_ADDED_EVENT || eventType === GROUP_REMOVED_EVENT) {
			continue;
		}

		subscribedEvents.push({ eventType });
	}

	if (events.includes(GROUP_ADDED_EVENT) || events.includes(GROUP_REMOVED_EVENT)) {
		const groupId = this.getNodeParameter('groupId') as string;
		subscribedEvents.push({
			eventType: GROUPS_UPDATED_EVENT,
			filter: { groupId },
		});
	}

	return subscribedEvents;
}

function sortSubscribedEvents(
	subscribedEvents: Array<{ eventType: string; filter?: IDataObject }>,
): Array<{ eventType: string; filter?: IDataObject }> {
	return [...subscribedEvents].sort((a, b) =>
		`${a.eventType}:${JSON.stringify(a.filter || {})}`.localeCompare(
			`${b.eventType}:${JSON.stringify(b.filter || {})}`,
		),
	);
}

function subscribedEventsMatch(
	currentEvents: Array<{ eventType: string; filter?: IDataObject }>,
	expectedEvents: Array<{ eventType: string; filter?: IDataObject }>,
): boolean {
	return JSON.stringify(sortSubscribedEvents(currentEvents)) === JSON.stringify(sortSubscribedEvents(expectedEvents));
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
						name: 'Person Added to Group',
						value: GROUP_ADDED_EVENT,
					},
					{
						name: 'Person Removed From Group',
						value: GROUP_REMOVED_EVENT,
					},
					{
						name: 'Person Updated',
						value: 'person.updated',
					},
				],
			},
			{
				displayName: 'Group Name or ID',
				name: 'groupId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getGroups',
				},
				required: true,
				default: '',
				displayOptions: {
					show: {
						events: [GROUP_ADDED_EVENT, GROUP_REMOVED_EVENT],
					},
				},
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
			},
		],
		usableAsTool: true,
	};

	methods = {
		loadOptions: {
			getGroups,
		},
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const webhookData = this.getWorkflowStaticData('node');
				const subscribedEvents = buildSubscribedEvents.call(this);

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
						return subscribedEventsMatch(webhook.subscribedEvents || [], subscribedEvents);
					}
				}

				return false;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const webhookData = this.getWorkflowStaticData('node');
				const subscribedEvents = buildSubscribedEvents.call(this);

				const body: IDataObject = {
					name: `n8n Workflow Webhook`,
					targetUrl: webhookUrl,
					subscribedEvents,
				};

				const method = webhookData.webhookId ? 'PATCH' : 'POST';
				const endpoint = webhookData.webhookId
					? `/v1/webhooks/${webhookData.webhookId}`
					: '/v1/webhooks';

				const response = (await folkApiRequest.call(this, method, endpoint, body)) as {
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
		const events = this.getNodeParameter('events') as string[];

		if (body.type === GROUPS_UPDATED_EVENT) {
			const groupId = this.getNodeParameter('groupId', '') as string;
			const changes = ((body.data as IDataObject)?.changes || []) as FolkWebhookChange[];
			const hasMatchingGroupChange = changes.some((change) => {
				const isGroupChange = Array.isArray(change.path) && change.path.join('.') === 'groups';
				const containsSelectedGroup = Array.isArray(change.value)
					? change.value.some((group) => group.id === groupId)
					: false;
				const selectedAdd = change.type === 'add' && events.includes(GROUP_ADDED_EVENT);
				const selectedRemove = change.type === 'remove' && events.includes(GROUP_REMOVED_EVENT);

				return isGroupChange && containsSelectedGroup && (selectedAdd || selectedRemove);
			});

			if (!hasMatchingGroupChange) {
				return {
					workflowData: [],
				};
			}
		}

		// Return the Folk event data to the workflow
		return {
			workflowData: [this.helpers.returnJsonArray(body)],
		};
	}
}
