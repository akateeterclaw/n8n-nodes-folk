import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['person'],
		operation: ['update'],
	},
};

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
		description: 'Email addresses to set for this person (replaces existing)',
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
		description: 'Phone numbers to set for this person (replaces existing)',
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
		displayName: 'Groups',
		name: 'groups',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		displayOptions,
		description: 'Groups to add the person to (max 100)',
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
						description: 'The ID of the group to add this person to',
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
		displayName: 'Companies',
		name: 'companies',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		displayOptions,
		description: 'Companies to associate with this person (max 20)',
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
				value: '={{ $value.companyValues?.map(c => c.isId ? { id: c.value } : { name: c.value }) || [] }}',
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
		description: 'Addresses to set for this person (max 20)',
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
		displayName: 'URLs',
		name: 'urls',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		displayOptions,
		description: 'URLs to set for this person (max 20)',
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
				value: '={{ $value.urlValues?.map(u => u.url) || [] }}',
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
