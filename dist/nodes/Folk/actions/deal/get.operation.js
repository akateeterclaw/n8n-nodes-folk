"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDescription = void 0;
const displayOptions = {
    show: {
        resource: ['deal'],
        operation: ['get'],
    },
};
exports.getDescription = [
    {
        displayName: 'Group',
        name: 'groupId',
        type: 'options',
        required: true,
        default: '',
        displayOptions,
        description: 'The group containing the deal',
        typeOptions: {
            loadOptionsMethod: 'getGroups',
        },
    },
    {
        displayName: 'Object Type',
        name: 'objectType',
        type: 'options',
        required: true,
        default: '',
        displayOptions,
        description: 'The custom object type for deals in this group',
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
        description: 'The ID of the deal to retrieve',
    },
];
//# sourceMappingURL=get.operation.js.map