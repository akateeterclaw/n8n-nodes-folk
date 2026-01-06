"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManyDescription = void 0;
const displayOptions = {
    show: {
        resource: ['reminder'],
        operation: ['getMany'],
    },
};
exports.getManyDescription = [
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
                resource: ['reminder'],
                operation: ['getMany'],
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
    {
        displayName: 'Filters',
        name: 'filters',
        type: 'collection',
        placeholder: 'Add Filter',
        default: {},
        displayOptions,
        options: [
            {
                displayName: 'Entity ID',
                name: 'entityId',
                type: 'string',
                default: '',
                description: 'Filter reminders by entity ID (person or company)',
                routing: {
                    send: {
                        type: 'query',
                        property: 'entity.id',
                    },
                },
            },
        ],
    },
];
//# sourceMappingURL=getMany.operation.js.map