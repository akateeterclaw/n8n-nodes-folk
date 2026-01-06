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
        displayName: 'Group',
        name: 'groupId',
        type: 'options',
        required: true,
        default: '',
        displayOptions,
        description: 'The group to get custom fields for',
        typeOptions: {
            loadOptionsMethod: 'getGroups',
        },
    },
];
//# sourceMappingURL=getCustomFields.operation.js.map