"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descriptions = void 0;
const create_operation_1 = require("./create.operation");
const delete_operation_1 = require("./delete.operation");
const get_operation_1 = require("./get.operation");
const getMany_operation_1 = require("./getMany.operation");
const update_operation_1 = require("./update.operation");
const displayOnlyForReminder = {
    show: {
        resource: ['reminder'],
    },
};
exports.descriptions = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: displayOnlyForReminder,
        options: [
            {
                name: 'Create',
                value: 'create',
                action: 'Create a reminder',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/v1/reminders',
                    },
                },
            },
            {
                name: 'Delete',
                value: 'delete',
                action: 'Delete a reminder',
                routing: {
                    request: {
                        method: 'DELETE',
                        url: '=/v1/reminders/{{ $parameter.reminderId }}',
                    },
                },
            },
            {
                name: 'Get',
                value: 'get',
                action: 'Get a reminder',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/v1/reminders/{{ $parameter.reminderId }}',
                    },
                },
            },
            {
                name: 'Get Many',
                value: 'getMany',
                action: 'Get many reminders',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/v1/reminders',
                    },
                },
            },
            {
                name: 'Update',
                value: 'update',
                action: 'Update a reminder',
                routing: {
                    request: {
                        method: 'PATCH',
                        url: '=/v1/reminders/{{ $parameter.reminderId }}',
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