"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDescription = void 0;
const displayOptions = {
    show: {
        resource: ['company'],
        operation: ['update'],
    },
};
exports.updateDescription = [
    {
        displayName: 'Company ID',
        name: 'companyId',
        type: 'string',
        default: '',
        required: true,
        displayOptions,
        description: 'The ID of the company to update',
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
                displayName: 'Description',
                name: 'description',
                type: 'string',
                typeOptions: {
                    rows: 3,
                },
                default: '',
                description: 'Brief description of the company',
                routing: {
                    send: {
                        type: 'body',
                        property: 'description',
                    },
                },
            },
            {
                displayName: 'Employee Range',
                name: 'employeeRange',
                type: 'options',
                default: '1-10',
                options: [
                    { name: '1-10', value: '1-10' },
                    { name: '10000+', value: '10000+' },
                    { name: '1001-5000', value: '1001-5000' },
                    { name: '11-50', value: '11-50' },
                    { name: '201-500', value: '201-500' },
                    { name: '5001-10000', value: '5001-10000' },
                    { name: '501-1000', value: '501-1000' },
                    { name: '51-200', value: '51-200' },
                ],
                description: 'Number of employees',
                routing: {
                    send: {
                        type: 'body',
                        property: 'employeeRange',
                    },
                },
            },
            {
                displayName: 'Foundation Year',
                name: 'foundationYear',
                type: 'string',
                default: '',
                placeholder: '2020',
                description: 'Year the company was founded (YYYY format)',
                routing: {
                    send: {
                        type: 'body',
                        property: 'foundationYear',
                    },
                },
            },
            {
                displayName: 'Funding Raised',
                name: 'fundingRaised',
                type: 'number',
                default: 0,
                description: 'Total funding raised in USD',
                routing: {
                    send: {
                        type: 'body',
                        property: 'fundingRaised',
                    },
                },
            },
            {
                displayName: 'Industry',
                name: 'industry',
                type: 'string',
                default: '',
                description: 'Industry or sector of the company',
                routing: {
                    send: {
                        type: 'body',
                        property: 'industry',
                    },
                },
            },
            {
                displayName: 'Last Funding Date',
                name: 'lastFundingDate',
                type: 'dateTime',
                default: '',
                description: 'Date of the last funding round (YYYY-MM-DD format)',
                routing: {
                    send: {
                        type: 'body',
                        property: 'lastFundingDate',
                        value: '={{ $value ? $value.split("T")[0] : undefined }}',
                    },
                },
            },
            {
                displayName: 'Name',
                name: 'name',
                type: 'string',
                default: '',
                description: 'Name of the company',
                routing: {
                    send: {
                        type: 'body',
                        property: 'name',
                    },
                },
            },
        ],
    },
    {
        displayName: 'Emails',
        name: 'emails',
        type: 'fixedCollection',
        typeOptions: {
            multipleValues: true,
        },
        default: {},
        displayOptions,
        description: 'Email addresses to set for this company (replaces existing)',
        options: [
            {
                displayName: 'Email',
                name: 'emailValues',
                values: [
                    {
                        displayName: 'Email',
                        name: 'email',
                        type: 'string',
                        placeholder: 'contact@company.com',
                        default: '',
                    },
                ],
            },
        ],
        routing: {
            send: {
                type: 'body',
                property: 'emails',
                value: '={{ $value.emailValues?.map(e => e.email) || [] }}',
            },
        },
    },
    {
        displayName: 'Phones',
        name: 'phones',
        type: 'fixedCollection',
        typeOptions: {
            multipleValues: true,
        },
        default: {},
        displayOptions,
        description: 'Phone numbers to set for this company (replaces existing)',
        options: [
            {
                displayName: 'Phone',
                name: 'phoneValues',
                values: [
                    {
                        displayName: 'Phone',
                        name: 'phone',
                        type: 'string',
                        placeholder: '+1234567890',
                        default: '',
                    },
                ],
            },
        ],
        routing: {
            send: {
                type: 'body',
                property: 'phones',
                value: '={{ $value.phoneValues?.map(p => p.phone) || [] }}',
            },
        },
    },
    {
        displayName: 'URLs',
        name: 'urls',
        type: 'fixedCollection',
        typeOptions: {
            multipleValues: true,
        },
        default: {},
        displayOptions,
        description: 'URLs to set for this company (replaces existing)',
        options: [
            {
                displayName: 'URL',
                name: 'urlValues',
                values: [
                    {
                        displayName: 'URL',
                        name: 'url',
                        type: 'string',
                        placeholder: 'https://company.com',
                        default: '',
                    },
                ],
            },
        ],
        routing: {
            send: {
                type: 'body',
                property: 'urls',
                value: '={{ $value.urlValues?.map(u => u.url) || [] }}',
            },
        },
    },
    {
        displayName: 'Groups',
        name: 'groups',
        type: 'fixedCollection',
        typeOptions: {
            multipleValues: true,
        },
        default: {},
        displayOptions,
        description: 'Groups to add the company to (max 100)',
        options: [
            {
                displayName: 'Group',
                name: 'groupValues',
                values: [
                    {
                        displayName: 'Group ID',
                        name: 'id',
                        type: 'string',
                        default: '',
                        description: 'The ID of the group to add this company to',
                    },
                ],
            },
        ],
        routing: {
            send: {
                type: 'body',
                property: 'groups',
                value: '={{ $value.groupValues?.map(g => ({ id: g.id })) || [] }}',
            },
        },
    },
    {
        displayName: 'Addresses',
        name: 'addresses',
        type: 'fixedCollection',
        typeOptions: {
            multipleValues: true,
        },
        default: {},
        displayOptions,
        description: 'Addresses to set for this company (max 20)',
        options: [
            {
                displayName: 'Address',
                name: 'addressValues',
                values: [
                    {
                        displayName: 'Address',
                        name: 'address',
                        type: 'string',
                        default: '',
                        description: 'Physical address',
                    },
                ],
            },
        ],
        routing: {
            send: {
                type: 'body',
                property: 'addresses',
                value: '={{ $value.addressValues?.map(a => a.address) || [] }}',
            },
        },
    },
    {
        displayName: 'Custom Field Values',
        name: 'customFieldValues',
        type: 'json',
        default: '{}',
        displayOptions,
        description: 'Custom field values grouped by group ID. Format: { "groupId": { "fieldName": "value" } }',
        routing: {
            send: {
                type: 'body',
                property: 'customFieldValues',
                value: '={{ $value ? (typeof $value === "string" ? JSON.parse($value) : $value) : undefined }}',
            },
        },
    },
];
//# sourceMappingURL=update.operation.js.map