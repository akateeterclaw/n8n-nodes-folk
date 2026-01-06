"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descriptions = void 0;
const get_operation_1 = require("./get.operation");
const getMany_operation_1 = require("./getMany.operation");
const getCurrent_operation_1 = require("./getCurrent.operation");
const displayOnlyForUser = {
    show: {
        resource: ['user'],
    },
};
exports.descriptions = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: displayOnlyForUser,
        options: [
            {
                name: 'Get',
                value: 'get',
                action: 'Get a user',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/v1/users/{{ $parameter.userId }}',
                    },
                },
            },
            {
                name: 'Get Current',
                value: 'getCurrent',
                action: 'Get the current user',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/v1/users/me',
                    },
                },
            },
            {
                name: 'Get Many',
                value: 'getMany',
                action: 'Get many users',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/v1/users',
                    },
                },
            },
        ],
        default: 'getMany',
    },
    ...get_operation_1.getDescription,
    ...getCurrent_operation_1.getCurrentDescription,
    ...getMany_operation_1.getManyDescription,
];
//# sourceMappingURL=index.js.map