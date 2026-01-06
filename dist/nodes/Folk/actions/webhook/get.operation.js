"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDescription = void 0;
const displayOptions = {
    show: {
        resource: ['webhook'],
        operation: ['get'],
    },
};
exports.getDescription = [
    {
        displayName: 'Webhook ID',
        name: 'webhookId',
        type: 'string',
        required: true,
        default: '',
        displayOptions,
        description: 'The ID of the webhook to retrieve',
    },
];
//# sourceMappingURL=get.operation.js.map