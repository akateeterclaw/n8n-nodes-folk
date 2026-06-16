"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDescription = void 0;
const displayOptions = {
    show: {
        resource: ['person'],
        operation: ['search'],
    },
};
const groupOperatorsWithIds = ['all', 'in', 'not_in'];
async function addGroupFilterQuery(requestOptions) {
    var _a;
    const operator = this.getNodeParameter('groupFilterOperator', 'none');
    if (operator === 'none') {
        return requestOptions;
    }
    const qs = ((_a = requestOptions.qs) !== null && _a !== void 0 ? _a : {});
    if (groupOperatorsWithIds.includes(operator)) {
        const groupIdsParameter = this.getNodeParameter('groupIds', []);
        const groupIds = (Array.isArray(groupIdsParameter)
            ? groupIdsParameter
            : [groupIdsParameter]).filter((groupId) => groupId);
        if (groupIds.length > 0) {
            qs[`filter[groups][${operator}][id]`] = groupIds;
        }
    }
    else {
        qs[`filter[groups][${operator}]`] = '';
    }
    requestOptions.qs = qs;
    return requestOptions;
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
        name: 'groupIds',
        type: 'string',
        default: [],
        placeholder: 'grp_79b6ed73-9939-4118-ba65-7f8cdf401052',
        required: true,
        displayOptions: {
            show: {
                resource: ['person'],
                operation: ['search'],
                groupFilterOperator: ['all', 'in', 'not_in'],
            },
        },
        description: 'One or more group IDs to filter by. Supports n8n expressions.',
        typeOptions: {
            multipleValues: true,
            multipleValueButtonText: 'Add Group ID',
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
                preSend: [addGroupFilterQuery],
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
