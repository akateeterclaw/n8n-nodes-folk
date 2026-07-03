"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolkTrigger = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const loadOptions_1 = require("../Folk/methods/loadOptions");
const GROUP_ADDED_EVENT = 'person.group_added';
const GROUP_REMOVED_EVENT = 'person.group_removed';
const GROUPS_UPDATED_EVENT = 'person.groups_updated';
const PERSON_UPDATED_FILTERED_EVENT = 'person.updated_filtered';
function isNotFoundError(error) {
    var _a, _b, _c;
    if (typeof error !== 'object' || error === null) {
        return false;
    }
    const apiError = error;
    const statusCode = (_b = (_a = apiError.httpCode) !== null && _a !== void 0 ? _a : apiError.statusCode) !== null && _b !== void 0 ? _b : (_c = apiError.cause) === null || _c === void 0 ? void 0 : _c.statusCode;
    return Number(statusCode) === 404;
}
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
function buildSubscribedEvents() {
    const events = this.getNodeParameter('events');
    const subscribedEvents = [];
    for (const eventType of events) {
        if (eventType === GROUP_ADDED_EVENT ||
            eventType === GROUP_REMOVED_EVENT ||
            eventType === PERSON_UPDATED_FILTERED_EVENT) {
            continue;
        }
        subscribedEvents.push({ eventType });
    }
    if (events.includes(GROUP_ADDED_EVENT) || events.includes(GROUP_REMOVED_EVENT)) {
        const groupId = this.getNodeParameter('groupId');
        subscribedEvents.push({
            eventType: GROUPS_UPDATED_EVENT,
            filter: { groupId },
        });
    }
    if (events.includes(PERSON_UPDATED_FILTERED_EVENT)) {
        const fieldType = this.getNodeParameter('personUpdatedFieldType');
        let path;
        if (fieldType === 'custom') {
            const groupId = this.getNodeParameter('personUpdatedGroupId');
            const fieldName = this.getNodeParameter('personUpdatedCustomField');
            path = ['customFieldValues', groupId, fieldName];
        }
        else {
            const fieldName = this.getNodeParameter('personUpdatedNativeField');
            path = [fieldName];
        }
        subscribedEvents.push({
            eventType: 'person.updated',
            filter: { path },
        });
    }
    return subscribedEvents;
}
function sortSubscribedEvents(subscribedEvents) {
    return [...subscribedEvents].sort((a, b) => `${a.eventType}:${JSON.stringify(a.filter || {})}`.localeCompare(`${b.eventType}:${JSON.stringify(b.filter || {})}`));
}
function subscribedEventsMatch(currentEvents, expectedEvents) {
    return JSON.stringify(sortSubscribedEvents(currentEvents)) === JSON.stringify(sortSubscribedEvents(expectedEvents));
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
                        {
                            name: 'Person Updated (Filtered)',
                            value: PERSON_UPDATED_FILTERED_EVENT,
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
                    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                },
                {
                    displayName: 'Field Type',
                    name: 'personUpdatedFieldType',
                    type: 'options',
                    required: true,
                    default: 'native',
                    displayOptions: {
                        show: {
                            events: [PERSON_UPDATED_FILTERED_EVENT],
                        },
                    },
                    options: [
                        {
                            name: 'Native Field',
                            value: 'native',
                        },
                        {
                            name: 'Custom Field',
                            value: 'custom',
                        },
                    ],
                },
                {
                    displayName: 'Updated Field',
                    name: 'personUpdatedNativeField',
                    type: 'options',
                    required: true,
                    default: 'firstName',
                    displayOptions: {
                        show: {
                            events: [PERSON_UPDATED_FILTERED_EVENT],
                            personUpdatedFieldType: ['native'],
                        },
                    },
                    options: [
                        { name: 'Addresses', value: 'addresses' },
                        { name: 'Birthday', value: 'birthday' },
                        { name: 'Description', value: 'description' },
                        { name: 'Emails', value: 'emails' },
                        { name: 'First Name', value: 'firstName' },
                        { name: 'Job Title', value: 'jobTitle' },
                        { name: 'Last Name', value: 'lastName' },
                        { name: 'Phones', value: 'phones' },
                        { name: 'URLs', value: 'urls' },
                    ],
                },
                {
                    displayName: 'Group Name or ID',
                    name: 'personUpdatedGroupId',
                    type: 'options',
                    typeOptions: {
                        loadOptionsMethod: 'getGroups',
                    },
                    required: true,
                    default: '',
                    displayOptions: {
                        show: {
                            events: [PERSON_UPDATED_FILTERED_EVENT],
                            personUpdatedFieldType: ['custom'],
                        },
                    },
                    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                },
                {
                    displayName: 'Updated Custom Field Name or ID',
                    name: 'personUpdatedCustomField',
                    type: 'options',
                    typeOptions: {
                        loadOptionsMethod: 'getPersonCustomFields',
                        loadOptionsDependsOn: ['personUpdatedGroupId'],
                    },
                    required: true,
                    default: '',
                    displayOptions: {
                        show: {
                            events: [PERSON_UPDATED_FILTERED_EVENT],
                            personUpdatedFieldType: ['custom'],
                        },
                    },
                    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                },
            ],
            usableAsTool: true,
        };
        this.methods = {
            loadOptions: {
                getGroups: loadOptions_1.getGroups,
                getPersonCustomFields: loadOptions_1.getPersonCustomFields,
            },
        };
        this.webhookMethods = {
            default: {
                async checkExists() {
                    var _a;
                    const webhookUrl = this.getNodeWebhookUrl('default');
                    const webhookData = this.getWorkflowStaticData('node');
                    const subscribedEvents = buildSubscribedEvents.call(this);
                    const response = (await folkApiRequest.call(this, 'GET', '/v1/webhooks'));
                    const webhooks = ((_a = response.data) === null || _a === void 0 ? void 0 : _a.items) || [];
                    for (const webhook of webhooks) {
                        if (webhook.targetUrl === webhookUrl) {
                            webhookData.webhookId = webhook.id;
                            return subscribedEventsMatch(webhook.subscribedEvents || [], subscribedEvents);
                        }
                    }
                    delete webhookData.webhookId;
                    return false;
                },
                async create() {
                    const webhookUrl = this.getNodeWebhookUrl('default');
                    const webhookData = this.getWorkflowStaticData('node');
                    const subscribedEvents = buildSubscribedEvents.call(this);
                    const body = {
                        name: `n8n Workflow Webhook`,
                        targetUrl: webhookUrl,
                        subscribedEvents,
                    };
                    let response;
                    if (webhookData.webhookId) {
                        try {
                            response = await folkApiRequest.call(this, 'PATCH', `/v1/webhooks/${webhookData.webhookId}`, body);
                        }
                        catch (error) {
                            if (!isNotFoundError(error)) {
                                throw error;
                            }
                            delete webhookData.webhookId;
                        }
                    }
                    response !== null && response !== void 0 ? response : (response = await folkApiRequest.call(this, 'POST', '/v1/webhooks', body));
                    const responseData = response.data;
                    if (responseData === null || responseData === void 0 ? void 0 : responseData.id) {
                        webhookData.webhookId = responseData.id;
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
                        catch (error) {
                            if (!isNotFoundError(error)) {
                                throw error;
                            }
                        }
                        delete webhookData.webhookId;
                    }
                    return true;
                },
            },
        };
    }
    async webhook() {
        var _a;
        const req = this.getRequestObject();
        const body = req.body;
        const events = this.getNodeParameter('events');
        if (body.type === GROUPS_UPDATED_EVENT) {
            const groupId = this.getNodeParameter('groupId', '');
            const changes = (((_a = body.data) === null || _a === void 0 ? void 0 : _a.changes) || []);
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
        return {
            workflowData: [this.helpers.returnJsonArray(body)],
        };
    }
}
exports.FolkTrigger = FolkTrigger;
//# sourceMappingURL=FolkTrigger.node.js.map
