"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDescription = void 0;
const displayOptions = {
    show: {
        resource: ['person'],
        operation: ['update'],
    },
};
function mergePrimitiveValues(existing, updates) {
    const values = [
        ...(Array.isArray(existing) ? existing : []),
        ...(Array.isArray(updates) ? updates : []),
    ].filter((value) => typeof value === 'string' && value.length > 0);
    return [...new Set(values)];
}
function mergeGroupValues(existing, updates) {
    const values = [
        ...(Array.isArray(existing) ? existing : []),
        ...(Array.isArray(updates) ? updates : []),
    ].filter((value) => typeof value === 'object' && value !== null);
    const valuesByKey = new Map();
    for (const value of values) {
        if (typeof value.id === 'string') {
            valuesByKey.set(value.id, { id: value.id });
        }
    }
    return Array.from(valuesByKey.values());
}
function mergeCompanyValues(existing, updates) {
    const values = [
        ...(Array.isArray(existing) ? existing : []),
        ...(Array.isArray(updates) ? updates : []),
    ].filter((value) => typeof value === 'object' && value !== null);
    const valuesByKey = new Map();
    for (const value of values) {
        if (typeof value.id === 'string') {
            valuesByKey.set(value.id, { id: value.id });
        }
        else if (typeof value.name === 'string') {
            valuesByKey.set(`name:${value.name}`, { name: value.name });
        }
    }
    return Array.from(valuesByKey.values());
}
function mergeCustomFieldValues(existing, updates) {
    var _a;
    const existingValues = (existing !== null && existing !== void 0 ? existing : {});
    const updateValues = (updates !== null && updates !== void 0 ? updates : {});
    const mergedValues = { ...existingValues };
    for (const [groupId, fields] of Object.entries(updateValues)) {
        mergedValues[groupId] = {
            ...((_a = existingValues[groupId]) !== null && _a !== void 0 ? _a : {}),
            ...fields,
        };
    }
    return mergedValues;
}
async function applyListUpdateMode(requestOptions, property) {
    var _a, _b, _c;
    const body = ((_a = requestOptions.body) !== null && _a !== void 0 ? _a : {});
    const updateFields = this.getNodeParameter('updateFields');
    const updateMode = ((_b = updateFields[`${property}UpdateMode`]) !== null && _b !== void 0 ? _b : 'overwrite');
    if (updateMode !== 'update' || !(property in body)) {
        requestOptions.body = body;
        return requestOptions;
    }
    const personId = this.getNodeParameter('personId');
    const response = (await this.helpers.httpRequestWithAuthentication.call(this, 'folkApi', {
        method: 'GET',
        url: `https://api.folk.app/v1/people/${personId}`,
    }));
    const person = (_c = response.data) !== null && _c !== void 0 ? _c : {};
    if (property === 'groups') {
        body[property] = mergeGroupValues(person[property], body[property]);
    }
    else if (property === 'companies') {
        body[property] = mergeCompanyValues(person[property], body[property]);
    }
    else if (property === 'customFieldValues') {
        body[property] = mergeCustomFieldValues(person[property], body[property]);
    }
    else {
        body[property] = mergePrimitiveValues(person[property], body[property]);
    }
    requestOptions.body = body;
    return requestOptions;
}
async function mergeAddresses(requestOptions) {
    return await applyListUpdateMode.call(this, requestOptions, 'addresses');
}
async function mergeCompanies(requestOptions) {
    return await applyListUpdateMode.call(this, requestOptions, 'companies');
}
async function mergeCustomFields(requestOptions) {
    return await applyListUpdateMode.call(this, requestOptions, 'customFieldValues');
}
async function mergeEmails(requestOptions) {
    return await applyListUpdateMode.call(this, requestOptions, 'emails');
}
async function mergeGroups(requestOptions) {
    return await applyListUpdateMode.call(this, requestOptions, 'groups');
}
async function mergePhones(requestOptions) {
    return await applyListUpdateMode.call(this, requestOptions, 'phones');
}
async function mergeUrls(requestOptions) {
    return await applyListUpdateMode.call(this, requestOptions, 'urls');
}
exports.updateDescription = [
    {
        displayName: 'Person ID',
        name: 'personId',
        type: 'string',
        default: '',
        required: true,
        displayOptions,
        description: 'The ID of the person to update',
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
                displayName: 'Birthday',
                name: 'birthday',
                type: 'dateTime',
                default: '',
                description: 'Birthday of the person (YYYY-MM-DD format)',
                routing: {
                    send: {
                        type: 'body',
                        property: 'birthday',
                        value: '={{ $value ? $value.split("T")[0] : undefined }}',
                    },
                },
            },
            {
                displayName: 'Description',
                name: 'description',
                type: 'string',
                typeOptions: {
                    rows: 3,
                },
                default: '',
                description: 'Brief description of the person',
                routing: {
                    send: {
                        type: 'body',
                        property: 'description',
                    },
                },
            },
            {
                displayName: 'First Name',
                name: 'firstName',
                type: 'string',
                default: '',
                description: 'First name of the person',
                routing: {
                    send: {
                        type: 'body',
                        property: 'firstName',
                    },
                },
            },
            {
                displayName: 'Full Name',
                name: 'fullName',
                type: 'string',
                default: '',
                description: 'Full name of the person (max 1000 characters)',
                routing: {
                    send: {
                        type: 'body',
                        property: 'fullName',
                    },
                },
            },
            {
                displayName: 'Job Title',
                name: 'jobTitle',
                type: 'string',
                default: '',
                description: 'Job title of the person',
                routing: {
                    send: {
                        type: 'body',
                        property: 'jobTitle',
                    },
                },
            },
            {
                displayName: 'Last Name',
                name: 'lastName',
                type: 'string',
                default: '',
                description: 'Last name of the person',
                routing: {
                    send: {
                        type: 'body',
                        property: 'lastName',
                    },
                },
            },
            {
                displayName: 'Emails Update Mode',
                name: 'emailsUpdateMode',
                type: 'options',
                default: 'overwrite',
                displayOptions,
                description: 'Whether entered emails replace or are added to existing emails',
                options: [
                    { name: 'Overwrite', value: 'overwrite' },
                    { name: 'Update', value: 'update' },
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
                description: 'Email addresses to update for this person',
                options: [
                    {
                        displayName: 'Email',
                        name: 'emailValues',
                        values: [
                            {
                                displayName: 'Email',
                                name: 'email',
                                type: 'string',
                                placeholder: 'name@email.com',
                                default: '',
                            },
                        ],
                    },
                ],
                routing: {
                    send: {
                        type: 'body',
                        property: 'emails',
                        value: '={{ $value.emailValues?.length ? $value.emailValues.map(e => e.email) : undefined }}',
                        preSend: [mergeEmails],
                    },
                },
            },
            {
                displayName: 'Phones Update Mode',
                name: 'phonesUpdateMode',
                type: 'options',
                default: 'overwrite',
                displayOptions,
                description: 'Whether entered phones replace or are added to existing phones',
                options: [
                    { name: 'Overwrite', value: 'overwrite' },
                    { name: 'Update', value: 'update' },
                ],
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
                description: 'Phone numbers to update for this person',
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
                        value: '={{ $value.phoneValues?.length ? $value.phoneValues.map(p => p.phone) : undefined }}',
                        preSend: [mergePhones],
                    },
                },
            },
            {
                displayName: 'Groups Update Mode',
                name: 'groupsUpdateMode',
                type: 'options',
                default: 'overwrite',
                displayOptions,
                description: 'Whether entered groups replace or are added to existing groups',
                options: [
                    { name: 'Overwrite', value: 'overwrite' },
                    { name: 'Update', value: 'update' },
                ],
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
                description: 'Groups to update for this person (max 100)',
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
                                description: 'The ID of the group to set for this person',
                            },
                        ],
                    },
                ],
                routing: {
                    send: {
                        type: 'body',
                        property: 'groups',
                        value: '={{ $value.groupValues?.length ? $value.groupValues.map(g => ({ id: g.id })) : undefined }}',
                        preSend: [mergeGroups],
                    },
                },
            },
            {
                displayName: 'Companies Update Mode',
                name: 'companiesUpdateMode',
                type: 'options',
                default: 'overwrite',
                displayOptions,
                description: 'Whether entered companies replace or are added to existing companies',
                options: [
                    { name: 'Overwrite', value: 'overwrite' },
                    { name: 'Update', value: 'update' },
                ],
            },
            {
                displayName: 'Companies',
                name: 'companies',
                type: 'fixedCollection',
                typeOptions: {
                    multipleValues: true,
                },
                default: {},
                displayOptions,
                description: 'Companies to update for this person (max 20)',
                options: [
                    {
                        displayName: 'Company',
                        name: 'companyValues',
                        values: [
                            {
                                displayName: 'Company ID or Name',
                                name: 'value',
                                type: 'string',
                                default: '',
                                description: 'Company ID or name to associate with this person',
                            },
                            {
                                displayName: 'Is ID',
                                name: 'isId',
                                type: 'boolean',
                                default: true,
                                description: 'Whether the value is an ID (true) or name (false)',
                            },
                        ],
                    },
                ],
                routing: {
                    send: {
                        type: 'body',
                        property: 'companies',
                        value: '={{ $value.companyValues?.length ? $value.companyValues.map(c => c.isId ? { id: c.value } : { name: c.value }) : undefined }}',
                        preSend: [mergeCompanies],
                    },
                },
            },
            {
                displayName: 'Addresses Update Mode',
                name: 'addressesUpdateMode',
                type: 'options',
                default: 'overwrite',
                displayOptions,
                description: 'Whether entered addresses replace or are added to existing addresses',
                options: [
                    { name: 'Overwrite', value: 'overwrite' },
                    { name: 'Update', value: 'update' },
                ],
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
                description: 'Addresses to update for this person (max 20)',
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
                        value: '={{ $value.addressValues?.length ? $value.addressValues.map(a => a.address) : undefined }}',
                        preSend: [mergeAddresses],
                    },
                },
            },
            {
                displayName: 'URLs Update Mode',
                name: 'urlsUpdateMode',
                type: 'options',
                default: 'overwrite',
                displayOptions,
                description: 'Whether entered URLs replace or are added to existing URLs',
                options: [
                    { name: 'Overwrite', value: 'overwrite' },
                    { name: 'Update', value: 'update' },
                ],
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
                description: 'URLs to update for this person (max 20)',
                options: [
                    {
                        displayName: 'URL',
                        name: 'urlValues',
                        values: [
                            {
                                displayName: 'URL',
                                name: 'url',
                                type: 'string',
                                placeholder: 'https://example.com',
                                default: '',
                            },
                        ],
                    },
                ],
                routing: {
                    send: {
                        type: 'body',
                        property: 'urls',
                        value: '={{ $value.urlValues?.length ? $value.urlValues.map(u => u.url) : undefined }}',
                        preSend: [mergeUrls],
                    },
                },
            },
            {
                displayName: 'Custom Field Values Update Mode',
                name: 'customFieldValuesUpdateMode',
                type: 'options',
                default: 'overwrite',
                displayOptions,
                description: 'Whether entered custom field values replace or are merged with existing values',
                options: [
                    { name: 'Overwrite', value: 'overwrite' },
                    { name: 'Update', value: 'update' },
                ],
            },
            {
                displayName: 'Custom Field Values',
                name: 'customFieldValues',
                type: 'json',
                default: '{}',
                displayOptions,
                description: 'Custom field values grouped by group ID. Format: { "groupId": { "fieldName": "value" } }.',
                routing: {
                    send: {
                        type: 'body',
                        property: 'customFieldValues',
                        value: '={{ $value ? (typeof $value === "string" ? (Object.keys(JSON.parse($value)).length ? JSON.parse($value) : undefined) : (Object.keys($value).length ? $value : undefined)) : undefined }}',
                        preSend: [mergeCustomFields],
                    },
                },
            },
        ],
    },
];
//# sourceMappingURL=update.operation.js.map
