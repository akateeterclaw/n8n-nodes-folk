"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDescription = void 0;
const displayOptions = {
    show: {
        resource: ['note'],
        operation: ['update'],
    },
};
exports.updateDescription = [
    {
        displayName: 'Note ID',
        name: 'noteId',
        type: 'string',
        required: true,
        default: '',
        displayOptions,
        description: 'The ID of the note to update',
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
                displayName: 'Content',
                name: 'content',
                type: 'string',
                typeOptions: {
                    rows: 5,
                },
                default: '',
                description: 'The new content of the note (supports markdown)',
                routing: {
                    send: {
                        type: 'body',
                        property: 'content',
                    },
                },
            },
            {
                displayName: 'Visibility',
                name: 'visibility',
                type: 'options',
                options: [
                    {
                        name: 'Public',
                        value: 'public',
                    },
                    {
                        name: 'Private',
                        value: 'private',
                    },
                ],
                default: 'public',
                description: 'The visibility of the note',
                routing: {
                    send: {
                        type: 'body',
                        property: 'visibility',
                    },
                },
            },
        ],
    },
];
//# sourceMappingURL=update.operation.js.map