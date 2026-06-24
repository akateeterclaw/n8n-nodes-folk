"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDescription = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const displayOptions = {
    show: {
        resource: ['person'],
        operation: ['search'],
    },
};
async function throwIfNoPeopleFound(items, response) {
    const body = response.body;
    const data = body.data;
    const people = data === null || data === void 0 ? void 0 : data.items;
    if (Array.isArray(people) && people.length === 0) {
        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'No people found matching the search criteria');
    }
    return items;
}
exports.searchDescription = [
    {
        displayName: 'Emails',
        name: 'emails',
        type: 'string',
        default: [],
        placeholder: 'name@example.com',
        displayOptions,
        description: 'One or more emails to search for. Adds filter[emails][eq] query parameters.',
        typeOptions: {
            multipleValues: true,
            multipleValueButtonText: 'Add Email',
        },
        routing: {
            send: {
                type: 'query',
                property: 'filter[emails][eq]',
            },
        },
    },
    {
        displayName: 'Phones',
        name: 'phones',
        type: 'string',
        default: [],
        placeholder: '+14065551234',
        displayOptions,
        description: 'One or more phone numbers to search for. Adds filter[phones][eq] query parameters.',
        typeOptions: {
            multipleValues: true,
            multipleValueButtonText: 'Add Phone',
        },
        routing: {
            send: {
                type: 'query',
                property: 'filter[phones][eq]',
            },
        },
    },
    {
        displayName: 'Group Filter Operator',
        name: 'groupFilterOperator',
        type: 'options',
        default: 'none',
        displayOptions,
        description: 'Filter people by group membership',
        options: [
            { name: 'All', value: 'all' },
            { name: 'Empty', value: 'empty' },
            { name: 'In', value: 'in' },
            { name: 'None', value: 'none' },
            { name: 'Not Empty', value: 'not_empty' },
            { name: 'Not In', value: 'not_in' },
        ],
    },
    {
        displayName: 'Group ID',
        name: 'groupIdsAll',
        type: 'string',
        default: [],
        placeholder: 'grp_79b6ed73-9939-4118-ba65-7f8cdf401052',
        required: true,
        displayOptions: {
            show: {
                resource: ['person'],
                operation: ['search'],
                groupFilterOperator: ['all'],
            },
        },
        description: 'One or more group IDs to search for. Adds filter[groups][all][ID] query parameters.',
        typeOptions: {
            multipleValues: true,
            multipleValueButtonText: 'Add Group ID',
        },
        routing: {
            send: {
                type: 'query',
                property: 'filter[groups][all][id]',
            },
        },
    },
    {
        displayName: 'Group ID',
        name: 'groupIdsIn',
        type: 'string',
        default: [],
        placeholder: 'grp_79b6ed73-9939-4118-ba65-7f8cdf401052',
        required: true,
        displayOptions: {
            show: {
                resource: ['person'],
                operation: ['search'],
                groupFilterOperator: ['in'],
            },
        },
        description: 'One or more group IDs to search for. Adds filter[groups][in][ID] query parameters.',
        typeOptions: {
            multipleValues: true,
            multipleValueButtonText: 'Add Group ID',
        },
        routing: {
            send: {
                type: 'query',
                property: 'filter[groups][in][id]',
            },
        },
    },
    {
        displayName: 'Group ID',
        name: 'groupIdsNotIn',
        type: 'string',
        default: [],
        placeholder: 'grp_79b6ed73-9939-4118-ba65-7f8cdf401052',
        required: true,
        displayOptions: {
            show: {
                resource: ['person'],
                operation: ['search'],
                groupFilterOperator: ['not_in'],
            },
        },
        description: 'One or more group IDs to search for. Adds filter[groups][not_in][ID] query parameters.',
        typeOptions: {
            multipleValues: true,
            multipleValueButtonText: 'Add Group ID',
        },
        routing: {
            send: {
                type: 'query',
                property: 'filter[groups][not_in][id]',
            },
        },
    },
    {
        displayName: 'Group Empty Filter',
        name: 'groupEmpty',
        type: 'boolean',
        default: true,
        displayOptions: {
            show: {
                resource: ['person'],
                operation: ['search'],
                groupFilterOperator: ['empty'],
            },
        },
        description: 'Whether to filter for people without groups',
        routing: {
            send: {
                type: 'query',
                property: 'filter[groups][empty]',
            },
        },
    },
    {
        displayName: 'Group Not Empty Filter',
        name: 'groupNotEmpty',
        type: 'boolean',
        default: true,
        displayOptions: {
            show: {
                resource: ['person'],
                operation: ['search'],
                groupFilterOperator: ['not_empty'],
            },
        },
        description: 'Whether to filter for people with groups',
        routing: {
            send: {
                type: 'query',
                property: 'filter[groups][not_empty]',
            },
        },
    },
    {
        displayName: 'Combinator',
        name: 'combinator',
        type: 'options',
        default: 'or',
        displayOptions,
        description: 'How to combine multiple filters',
        options: [
            { name: 'AND', value: 'and' },
            { name: 'OR', value: 'or' },
        ],
        routing: {
            send: {
                type: 'query',
                property: 'combinator',
            },
            output: {
                postReceive: [throwIfNoPeopleFound],
            },
        },
    },
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
                resource: ['person'],
                operation: ['search'],
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
];
//# sourceMappingURL=search.operation.js.map
