"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDescription = void 0;
const displayOptions = {
    show: {
        resource: ['webhook'],
        operation: ['delete'],
    },
};
exports.deleteDescription = [
    {
        displayName: 'Webhook ID',
        name: 'webhookId',
        type: 'string',
        required: true,
        default: '',
        displayOptions,
        description: 'The ID of the webhook to delete',
    },
];
//# sourceMappingURL=delete.operation.js.map