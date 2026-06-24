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
		...(Array.isArray(existing) ? existing : []),
		...(Array.isArray(updates) ? updates : []),
	].filter((value): value is string => typeof value === 'string' && value.length > 0);

	return [...new Set(values)];
}

function mergeObjectValues(existing: unknown, updates: unknown): IDataObject[] {
	const values = [
		...(Array.isArray(existing) ? existing : []),
		...(Array.isArray(updates) ? updates : []),
	].filter((value): value is IDataObject => typeof value === 'object' && value !== null);
	const valuesByKey = new Map<string, IDataObject>();

	for (const value of values) {
		const key = typeof value.id === 'string' ? value.id : `name:${String(value.name ?? '')}`;
		valuesByKey.set(key, value);
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

async function applyUpdateMode(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const body = (requestOptions.body ?? {}) as IDataObject;
	const updateMode = this.getNodeParameter('updateMode') as UpdateMode;
	delete body.updateMode;

	if (updateMode !== 'update') {
		requestOptions.body = body;
		return requestOptions;
	}

	const mergeableProperties = [
		'emails',
		'phones',
		'addresses',
		'urls',
		'groups',
		'companies',
		'customFieldValues',
	];
	const propertiesToMerge = mergeableProperties.filter((property) => property in body);

	if (propertiesToMerge.length === 0) {
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

	for (const property of propertiesToMerge) {
		if (property === 'groups' || property === 'companies') {
			body[property] = mergeObjectValues(person[property], body[property]);
		} else if (property === 'customFieldValues') {
			body[property] = mergeCustomFieldValues(person[property], body[property]);
		} else {
			body[property] = mergePrimitiveValues(person[property], body[property]);
		}
	}

	requestOptions.body = body;
	return requestOptions;
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
		description: 'Whether list fields replace existing values or are added to them',
		options: [
			{
				name: 'Overwrite',
				value: 'overwrite',
				description: 'Replace each selected list field with the values entered below',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Add entered list values to existing values without removing them',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'updateMode',
				preSend: [applyUpdateMode],
			},
		},
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
			},
		},
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
			},
		},
	},
];
