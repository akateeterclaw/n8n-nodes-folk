"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDescription = void 0;
const displayOptions = {
    show: {
        resource: ['interaction'],
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
        description: 'The ID of the person or company this interaction is with',
        routing: {
            send: {
                type: 'body',
                property: 'entity.id',
            },
        },
    },
    {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        required: true,
        default: '',
        displayOptions,
        placeholder: 'Coffee with John Doe',
        description: 'The title of the interaction (max 255 characters)',
        routing: {
            send: {
                type: 'body',
                property: 'title',
            },
        },
    },
    {
        displayName: 'Date/Time',
        name: 'dateTime',
        type: 'dateTime',
        required: true,
        default: '',
        displayOptions,
        description: 'When the interaction took place',
        routing: {
            send: {
                type: 'body',
                property: 'dateTime',
            },
        },
    },
    {
        displayName: 'Type Mode',
        name: 'typeMode',
        type: 'options',
        required: true,
        default: 'predefined',
        displayOptions,
        description: 'Use a predefined type or a custom emoji',
        options: [
            {
                name: 'Predefined Type',
                value: 'predefined',
            },
            {
                name: 'Custom Emoji',
                value: 'custom',
            },
        ],
    },
    {
        displayName: 'Type',
        name: 'type',
        type: 'options',
        required: true,
        default: 'meeting',
        displayOptions: {
            show: {
                resource: ['interaction'],
                operation: ['create'],
                typeMode: ['predefined'],
            },
        },
        description: 'The type of interaction',
        options: [
            {
                name: 'Call',
                value: 'call',
            },
            {
                name: 'Coffee',
                value: 'coffee',
            },
            {
                name: 'Discord',
                value: 'discord',
            },
            {
                name: 'Drink',
                value: 'drink',
            },
            {
                name: 'Event',
                value: 'event',
            },
            {
                name: 'Facebook Messenger',
                value: 'fbMessenger',
            },
            {
                name: 'Hangout',
                value: 'hangout',
            },
            {
                name: 'iMessage',
                value: 'iMessage',
            },
            {
                name: 'LinkedIn',
                value: 'linkedin',
            },
            {
                name: 'Lunch',
                value: 'lunch',
            },
            {
                name: 'Meeting',
                value: 'meeting',
            },
            {
                name: 'Message',
                value: 'message',
            },
            {
                name: 'Signal',
                value: 'signal',
            },
            {
                name: 'Skype',
                value: 'skype',
            },
            {
                name: 'Slack',
                value: 'slack',
            },
            {
                name: 'Telegram',
                value: 'telegram',
            },
            {
                name: 'Twitter',
                value: 'twitter',
            },
            {
                name: 'Viber',
                value: 'viber',
            },
            {
                name: 'WeChat',
                value: 'wechat',
            },
            {
                name: 'WhatsApp',
                value: 'whatsapp',
            },
        ],
        routing: {
            send: {
                type: 'body',
                property: 'type',
            },
        },
    },
    {
        displayName: 'Custom Emoji',
        name: 'customEmoji',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['interaction'],
                operation: ['create'],
                typeMode: ['custom'],
            },
        },
        placeholder: '🎉',
        description: 'A single emoji to use as the interaction type',
        routing: {
            send: {
                type: 'body',
                property: 'type',
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
        description: 'The content/notes of the interaction (max 100,000 characters)',
        routing: {
            send: {
                type: 'body',
                property: 'content',
            },
        },
    },
];
//# sourceMappingURL=create.operation.js.map