"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDescription = void 0;
const displayOptions = {
    show: {
        resource: ['note'],
        operation: ['create'],
    },
};
exports.createDescription = [
    {
        displayName: 'Entity ID',
        name: 'entityId',
        type: 'string',
        required: true,
        default: '',
        displayOptions,
        description: 'The ID of the person or company to attach this note to',
        routing: {
            send: {
                type: 'body',
                property: 'entity.id',
            },
        },
    },
    {
        displayName: 'Content',
        name: 'content',
        type: 'string',
        typeOptions: {
            rows: 5,
        },
        required: true,
        default: '',
        displayOptions,
        description: 'The content of the note (supports markdown)',
        routing: {
            send: {
                type: 'body',
                property: 'content',
            },
        },
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions,
        options: [
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
//# sourceMappingURL=create.operation.js.map