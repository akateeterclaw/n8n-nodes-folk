"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descriptions = void 0;
const create_operation_1 = require("./create.operation");
const displayOnlyForInteraction = {
    show: {
        resource: ['interaction'],
    },
};
exports.descriptions = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: displayOnlyForInteraction,
        options: [
            {
                name: 'Create',
                value: 'create',
                action: 'Create an interaction',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/v1/interactions',
                    },
                },
            },
        ],
        default: 'create',
    },
    ...create_operation_1.createDescription,
];
//# sourceMappingURL=index.js.map