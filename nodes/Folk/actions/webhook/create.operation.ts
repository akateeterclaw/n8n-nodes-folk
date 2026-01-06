import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['webhook'],
		operation: ['create'],
	},
};

export const createDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'The name of the webhook (max 255 characters)',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Target URL',
		name: 'targetUrl',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		placeholder: 'https://example.com/webhook',
		description: 'The URL where webhook events will be sent',
		routing: {
			send: {
				type: 'body',
				property: 'targetUrl',
			},
		},
	},
	{
		displayName: 'Subscribed Events',
		name: 'subscribedEvents',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		required: true,
		default: {},
		displayOptions,
		options: [
			{
				displayName: 'Event',
				name: 'eventValues',
				values: [
					{
						displayName: 'Event Type',
						name: 'eventType',
						type: 'options',
						default: 'person.created',
						options: [
							{
								name: 'Company Created',
								value: 'company.created',
							},
							{
								name: 'Company Deleted',
								value: 'company.deleted',
							},
							{
								name: 'Company Updated',
								value: 'company.updated',
							},
							{
								name: 'Object Created',
								value: 'object.created',
							},
							{
								name: 'Object Deleted',
								value: 'object.deleted',
							},
							{
								name: 'Object Updated',
								value: 'object.updated',
							},
							{
								name: 'Person Created',
								value: 'person.created',
							},
							{
								name: 'Person Deleted',
								value: 'person.deleted',
							},
							{
								name: 'Person Updated',
								value: 'person.updated',
							},
						],
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'subscribedEvents',
				value: '={{ $value.eventValues?.map(e => ({ eventType: e.eventType })) || [] }}',
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
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Active',
						value: 'active',
					},
					{
						name: 'Inactive',
						value: 'inactive',
					},
				],
				default: 'active',
				description: 'The status of the webhook',
				routing: {
					send: {
						type: 'body',
						property: 'status',
					},
				},
			},
		],
	},
];
