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
];
//# sourceMappingURL=getCustomFields.operation.js.map