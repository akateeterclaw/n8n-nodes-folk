"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDescription = void 0;
const displayOptions = {
    show: {
        resource: ['reminder'],
        operation: ['create'],
    },
};
exports.createDescription = [
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        required: true,
        default: '',
        displayOptions,
        description: 'The name of the reminder (max 255 characters)',
        routing: {
            send: {
                type: 'body',
                property: 'name',
            },
        },
    },
    {
        displayName: 'Entity ID',
        name: 'entityId',
        type: 'string',
        required: true,
        default: '',
        displayOptions,
        description: 'The ID of the person or company to attach this reminder to',
        routing: {
            send: {
                type: 'body',
                property: 'entity.id',
            },
        },
    },
    {
        displayName: 'Recurrence Rule',
        name: 'recurrenceRule',
        type: 'string',
        required: true,
        default: '',
        displayOptions,
        placeholder: 'FREQ=DAILY;INTERVAL=1',
        description: 'iCalendar RFC 5545 recurrence rule (e.g., FREQ=DAILY;INTERVAL=1)',
        routing: {
            send: {
                type: 'body',
                property: 'recurrenceRule',
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
                description: 'The visibility of the reminder',
                routing: {
                    send: {
                        type: 'body',
                        property: 'visibility',
                    },
                },
            },
            {
                displayName: 'Assigned User IDs',
                name: 'assignedUsers',
                type: 'string',
                default: '',
                description: 'Comma-separated list of user IDs to assign to this reminder',
                routing: {
                    send: {
                        type: 'body',
                        property: 'assignedUsers',
                        value: '={{ $value ? $value.split(",").map(id => ({ id: id.trim() })) : [] }}',
                    },
                },
            },
        ],
    },
];
//# sourceMappingURL=create.operation.js.map