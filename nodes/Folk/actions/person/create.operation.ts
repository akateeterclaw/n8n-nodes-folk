import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['person'],
		operation: ['create'],
	},
};

export const createDescription: INodeProperties[] = [
	{
		displayName: 'First Name',
		name: 'firstName',
		type: 'string',
		default: '',
		required: true,
		displayOptions,
		description: 'First name of the person',
		routing: {
			send: {
				type: 'body',
				property: 'firstName',
			},
		},
	},
	{
		displayName: 'Last Name',
		name: 'lastName',
		type: 'string',
		default: '',
		required: true,
		displayOptions,
		description: 'Last name of the person',
		routing: {
			send: {
				type: 'body',
				property: 'lastName',
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
];
