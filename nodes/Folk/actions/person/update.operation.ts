import type {
	IDataObject,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['person'],
		operation: ['update'],
	},
};

type UpdateMode = 'overwrite' | 'update';

interface FolkPersonResponse {
	data?: IDataObject;
}

function mergePrimitiveValues(existing: unknown, updates: unknown): string[] {
	const values = [
		...(Array.isArray(updates) ? updates : []),
		...(Array.isArray(existing) ? existing : []),
	].filter((value): value is string => typeof value === 'string' && value.length > 0);

	return [...new Set(values)];
}

function mergeGroupValues(existing: unknown, updates: unknown): IDataObject[] {
	const values = [
		...(Array.isArray(updates) ? updates : []),
		...(Array.isArray(existing) ? existing : []),
	].filter((value): value is IDataObject => typeof value === 'object' && value !== null);
	const valuesByKey = new Map<string, IDataObject>();

	for (const value of values) {
		if (typeof value.id === 'string') {
			valuesByKey.set(value.id, { id: value.id });
		}
	}

	return Array.from(valuesByKey.values());
}

function mergeCompanyValues(existing: unknown, updates: unknown): IDataObject[] {
	const values = [
		...(Array.isArray(updates) ? updates : []),
		...(Array.isArray(existing) ? existing : []),
	].filter((value): value is IDataObject => typeof value === 'object' && value !== null);
	const valuesByKey = new Map<string, IDataObject>();

	for (const value of values) {
		if (typeof value.id === 'string') {
			valuesByKey.set(value.id, { id: value.id });
		} else if (typeof value.name === 'string') {
			valuesByKey.set(`name:${value.name}`, { name: value.name });
		}
	}

	return Array.from(valuesByKey.values());
}

function mergeCustomFieldValues(existing: unknown, updates: unknown): IDataObject {
	const existingValues = (existing ?? {}) as IDataObject;
	const updateValues = (updates ?? {}) as IDataObject;
	const mergedValues: IDataObject = { ...existingValues };

	for (const [groupId, fields] of Object.entries(updateValues)) {
		mergedValues[groupId] = {
			...((existingValues[groupId] ?? {}) as IDataObject),
			...(fields as IDataObject),
		};
	}

	return mergedValues;
}

async function applyListUpdateMode(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
	property: 'addresses' | 'companies' | 'customFieldValues' | 'emails' | 'groups' | 'phones' | 'urls',
): Promise<IHttpRequestOptions> {
	const body = (requestOptions.body ?? {}) as IDataObject;
	const updateMode = this.getNodeParameter('updateMode') as UpdateMode;

	if (updateMode !== 'update' || !(property in body)) {
		requestOptions.body = body;
		return requestOptions;
	}

	const personId = this.getNodeParameter('personId') as string;
	const response = (await this.helpers.httpRequestWithAuthentication.call(
		this,
		'folkApi',
		{
			method: 'GET',
			url: `https://api.folk.app/v1/people/${personId}`,
		},
	)) as FolkPersonResponse;
	const person = response.data ?? {};

	if (property === 'groups') {
		body[property] = mergeGroupValues(person[property], body[property]);
	} else if (property === 'companies') {
		body[property] = mergeCompanyValues(person[property], body[property]);
	} else if (property === 'customFieldValues') {
		body[property] = mergeCustomFieldValues(person[property], body[property]);
	} else {
		body[property] = mergePrimitiveValues(person[property], body[property]);
	}

	requestOptions.body = body;
	return requestOptions;
}

async function mergeAddresses(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	return await applyListUpdateMode.call(this, requestOptions, 'addresses');
}

async function mergeCompanies(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	return await applyListUpdateMode.call(this, requestOptions, 'companies');
}

async function mergeCustomFields(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	return await applyListUpdateMode.call(this, requestOptions, 'customFieldValues');
}

async function mergeEmails(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	return await applyListUpdateMode.call(this, requestOptions, 'emails');
}

async function mergeGroups(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	return await applyListUpdateMode.call(this, requestOptions, 'groups');
}

async function mergePhones(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	return await applyListUpdateMode.call(this, requestOptions, 'phones');
}

async function mergeUrls(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	return await applyListUpdateMode.call(this, requestOptions, 'urls');
}

export const updateDescription: INodeProperties[] = [
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
		displayName: 'Update Mode',
		name: 'updateMode',
		type: 'options',
		default: 'overwrite',
		displayOptions,
		description: 'Whether list values replace or are added to existing values',
		options: [
			{ name: 'Overwrite', value: 'overwrite' },
			{ name: 'Update', value: 'update' },
		],
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions,
		// Keep the common scalar fields first, followed by the list fields.
		// eslint-disable-next-line n8n-nodes-base/node-param-collection-type-unsorted-items
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
		displayName: 'Emails',
		name: 'emails',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
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
		displayName: 'Phones',
		name: 'phones',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
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
		displayName: 'Groups',
		name: 'groups',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
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
		displayName: 'Companies',
		name: 'companies',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
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
		displayName: 'Addresses',
		name: 'addresses',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
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
		displayName: 'URLs',
		name: 'urls',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
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
		displayName: 'Custom Field Values',
		name: 'customFieldValues',
		type: 'json',
		default: '{}',
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
