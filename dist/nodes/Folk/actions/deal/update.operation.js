"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDescription = void 0;
const displayOptions = {
    show: {
        resource: ['deal'],
        operation: ['update'],
    },
};
exports.updateDescription = [
    {
        displayName: 'Group Name or ID',
        name: 'groupId',
        type: 'options',
        required: true,
        default: '',
        displayOptions,
        description: 'The group containing the deal. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        typeOptions: {
            loadOptionsMethod: 'getGroups',
        },
    },
    {
        displayName: 'Object Type Name or ID',
        name: 'objectType',
        type: 'options',
        required: true,
        default: '',
        displayOptions,
        description: 'The custom object type for deals in this group. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        typeOptions: {
            loadOptionsMethod: 'getGroupObjectTypes',
            loadOptionsDependsOn: ['groupId'],
        },
    },
    {
        displayName: 'Deal ID',
        name: 'dealId',
        type: 'string',
        required: true,
        default: '',
        displayOptions,
        description: 'The ID of the deal to update',
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
                description: 'The new name of the deal',
                routing: {
                    send: {
                        type: 'body',
                        property: 'name',
                    },
                },
            },
            {
                displayName: 'Company IDs',
                name: 'companies',
                type: 'string',
                default: '',
                description: 'Comma-separated list of company IDs to associate with this deal',
                routing: {
                    send: {
                        type: 'body',
                        property: 'companies',
                        value: '={{ $value ? $value.split(",").map(id => id.trim()) : [] }}',
                    },
                },
            },
            {
                displayName: 'Person IDs',
                name: 'people',
                type: 'string',
                default: '',
                description: 'Comma-separated list of person IDs to associate with this deal',
                routing: {
                    send: {
                        type: 'body',
                        property: 'people',
                        value: '={{ $value ? $value.split(",").map(id => id.trim()) : [] }}',
                    },
                },
            },
        ],
    },
];
//# sourceMappingURL=update.operation.js.map