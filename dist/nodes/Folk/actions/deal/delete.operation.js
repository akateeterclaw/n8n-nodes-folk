"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDescription = void 0;
const displayOptions = {
    show: {
        resource: ['deal'],
        operation: ['delete'],
    },
};
exports.deleteDescription = [
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
        description: 'The ID of the deal to delete',
    },
];
//# sourceMappingURL=delete.operation.js.map