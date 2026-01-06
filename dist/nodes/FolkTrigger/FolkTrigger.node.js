"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolkTrigger = void 0;
const n8n_workflow_1 = require("n8n-workflow");
async function folkApiRequest(method, endpoint, body) {
    const options = {
        method,
        url: `https://api.folk.app${endpoint}`,
        json: true,
    };
    if (body) {
        options.body = body;
    }
    return await this.helpers.httpRequestWithAuthentication.call(this, 'folkApi', options);
}
class FolkTrigger {
    constructor() {
        this.description = {
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
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
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
        this.webhookMethods = {
            default: {
                async checkExists() {
                    var _a;
                    const webhookUrl = this.getNodeWebhookUrl('default');
                    const webhookData = this.getWorkflowStaticData('node');
                    const response = (await folkApiRequest.call(this, 'GET', '/v1/webhooks'));
                    const webhooks = ((_a = response.data) === null || _a === void 0 ? void 0 : _a.items) || [];
                    for (const webhook of webhooks) {
                        if (webhook.targetUrl === webhookUrl) {
                            webhookData.webhookId = webhook.id;
                            return true;
                        }
                    }
                    return false;
                },
                async create() {
                    var _a;
                    const webhookUrl = this.getNodeWebhookUrl('default');
                    const webhookData = this.getWorkflowStaticData('node');
                    const events = this.getNodeParameter('events');
                    const subscribedEvents = events.map((eventType) => ({ eventType }));
                    const body = {
                        name: `n8n Workflow Webhook`,
                        targetUrl: webhookUrl,
                        subscribedEvents,
                    };
                    const response = (await folkApiRequest.call(this, 'POST', '/v1/webhooks', body));
                    if ((_a = response.data) === null || _a === void 0 ? void 0 : _a.id) {
                        webhookData.webhookId = response.data.id;
                        return true;
                    }
                    return false;
                },
                async delete() {
                    const webhookData = this.getWorkflowStaticData('node');
                    if (webhookData.webhookId) {
                        try {
                            await folkApiRequest.call(this, 'DELETE', `/v1/webhooks/${webhookData.webhookId}`);
                        }
                        catch {
                            return false;
                        }
                        delete webhookData.webhookId;
                    }
                    return true;
                },
            },
        };
    }
    async webhook() {
        const req = this.getRequestObject();
        const body = req.body;
        return {
            workflowData: [this.helpers.returnJsonArray(body)],
        };
    }
}
exports.FolkTrigger = FolkTrigger;
//# sourceMappingURL=FolkTrigger.node.js.map