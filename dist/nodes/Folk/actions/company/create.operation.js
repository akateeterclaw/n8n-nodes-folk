"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDescription = void 0;
const displayOptions = {
    show: {
        resource: ['company'],
        operation: ['create'],
    },
};
exports.createDescription = [
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        required: true,
        displayOptions,
        description: 'Name of the company (unique across workspace)',
        routing: {
            send: {
                type: 'body',
                property: 'name',
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
];
//# sourceMappingURL=create.operation.js.map