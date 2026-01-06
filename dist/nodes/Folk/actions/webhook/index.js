"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descriptions = void 0;
const create_operation_1 = require("./create.operation");
const delete_operation_1 = require("./delete.operation");
const get_operation_1 = require("./get.operation");
const getMany_operation_1 = require("./getMany.operation");
const update_operation_1 = require("./update.operation");
const displayOnlyForWebhook = {
    show: {
        resource: ['webhook'],
    },
};
exports.descriptions = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: displayOnlyForWebhook,
        options: [
            {
                name: 'Create',
                value: 'create',
                action: 'Create a webhook',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/v1/webhooks',
                    },
                },
            },
            {
                name: 'Delete',
                value: 'delete',
                action: 'Delete a webhook',
                routing: {
                    request: {
                        method: 'DELETE',
                        url: '=/v1/webhooks/{{ $parameter.webhookId }}',
                    },
                },
            },
            {
                name: 'Get',
                value: 'get',
                action: 'Get a webhook',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/v1/webhooks/{{ $parameter.webhookId }}',
                    },
                },
            },
            {
                name: 'Get Many',
                value: 'getMany',
                action: 'Get many webhooks',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/v1/webhooks',
                    },
                },
            },
            {
                name: 'Update',
                value: 'update',
                action: 'Update a webhook',
                routing: {
                    request: {
                        method: 'PATCH',
                        url: '=/v1/webhooks/{{ $parameter.webhookId }}',
                    },
                },
            },
        ],
        default: 'getMany',
    },
    ...create_operation_1.createDescription,
    ...delete_operation_1.deleteDescription,
    ...get_operation_1.getDescription,
    ...getMany_operation_1.getManyDescription,
    ...update_operation_1.updateDescription,
];
//# sourceMappingURL=index.js.map