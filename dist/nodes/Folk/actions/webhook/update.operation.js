"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDescription = void 0;
const displayOptions = {
    show: {
        resource: ['webhook'],
        operation: ['update'],
    },
};
exports.updateDescription = [
    {
        displayName: 'Webhook ID',
        name: 'webhookId',
        type: 'string',
        required: true,
        default: '',
        displayOptions,
        description: 'The ID of the webhook to update',
    },
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions,
        options: [
            {
                displayName: 'Name',
                name: 'name',
                type: 'string',
                default: '',
                description: 'The new name of the webhook (max 255 characters)',
                routing: {
                    send: {
                        type: 'body',
                        property: 'name',
                    },
                },
            },
            {
                displayName: 'Target URL',
                name: 'targetUrl',
                type: 'string',
                default: '',
                placeholder: 'https://example.com/webhook',
                description: 'The new URL where webhook events will be sent',
                routing: {
                    send: {
                        type: 'body',
                        property: 'targetUrl',
                    },
                },
            },
            {
                displayName: 'Status',
                name: 'status',
                type: 'options',
                options: [
                    {
                        name: 'Active',
                        value: 'active',
                    },
                    {
                        name: 'Inactive',
                        value: 'inactive',
                    },
                ],
                default: 'active',
                description: 'The status of the webhook',
                routing: {
                    send: {
                        type: 'body',
                        property: 'status',
                    },
                },
            },
        ],
    },
];
//# sourceMappingURL=update.operation.js.map