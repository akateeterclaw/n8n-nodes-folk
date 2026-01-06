"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descriptions = void 0;
const getMany_operation_1 = require("./getMany.operation");
const getCustomFields_operation_1 = require("./getCustomFields.operation");
const displayOnlyForGroup = {
    show: {
        resource: ['group'],
    },
};
exports.descriptions = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: displayOnlyForGroup,
        options: [
            {
                name: 'Get Custom Fields',
                value: 'getCustomFields',
                action: 'Get custom fields for a group',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/v1/groups/{{ $parameter.groupId }}/customFields',
                    },
                },
            },
            {
                name: 'Get Many',
                value: 'getMany',
                action: 'Get many groups',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/v1/groups',
                    },
                },
            },
        ],
        default: 'getMany',
    },
    ...getCustomFields_operation_1.getCustomFieldsDescription,
    ...getMany_operation_1.getManyDescription,
];
//# sourceMappingURL=index.js.map