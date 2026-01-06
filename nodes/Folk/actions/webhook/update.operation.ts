import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['webhook'],
		operation: ['update'],
	},
};

export const updateDescription: INodeProperties[] = [
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'The ID of the webhook to update',
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
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The new name of the webhook (max 255 characters)',
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
				default: '',
				placeholder: 'https://example.com/webhook',
				description: 'The new URL where webhook events will be sent',
				routing: {
					send: {
						type: 'body',
						property: 'targetUrl',
					},
				},
			},
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
	{
		displayName: 'Subscribed Events',
		name: 'subscribedEvents',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		displayOptions,
		description: 'Events to subscribe to (1-20 events). This replaces existing subscribed events.',
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
					{
						displayName: 'Filter (JSON)',
						name: 'filter',
						type: 'json',
						default: '',
						description: 'Optional filter for this event. Format depends on event type. Example: {"groupId": "grp_xxx", "path": ["status"], "value": "won"}',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'subscribedEvents',
				value: '={{ $value.eventValues?.map(e => { const event = { eventType: e.eventType }; if (e.filter) { event.filter = typeof e.filter === "string" ? JSON.parse(e.filter) : e.filter; } return event; }) || [] }}',
			},
		},
	},
];
