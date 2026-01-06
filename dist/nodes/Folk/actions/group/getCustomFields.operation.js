"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomFieldsDescription = void 0;
const displayOptions = {
    show: {
        resource: ['group'],
        operation: ['getCustomFields'],
    },
};
exports.getCustomFieldsDescription = [
    {
        displayName: 'Group Name or ID',
        name: 'groupId',
        type: 'options',
        required: true,
        default: '',
        displayOptions,
        description: 'The group to get custom fields for. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        typeOptions: {
            loadOptionsMethod: 'getGroups',
        },
    },
    {
        displayName: 'Entity Type',
        name: 'entityType',
        type: 'string',
        required: true,
        default: 'person',
        displayOptions,
        description: 'The entity type to get custom fields for. Can be "person", "company", or a custom object type name.',
        placeholder: 'person',
    },
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        default: false,
        displayOptions,
        description: 'Whether to return all results or only up to a given limit',
    },
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: 50,
        typeOptions: {
            minValue: 1,
            maxValue: 100,
        },
        displayOptions: {
            show: {
                resource: ['group'],
                operation: ['getCustomFields'],
                returnAll: [false],
            },
        },
        description: 'Max number of results to return',
        routing: {
            send: {
                type: 'query',
                property: 'limit',
            },
        },
    },
];
//# sourceMappingURL=getCustomFields.operation.js.map