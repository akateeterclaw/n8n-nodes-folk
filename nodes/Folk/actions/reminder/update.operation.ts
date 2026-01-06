import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['reminder'],
		operation: ['update'],
	},
};

export const updateDescription: INodeProperties[] = [
	{
		displayName: 'Reminder ID',
		name: 'reminderId',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'The ID of the reminder to update',
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
				description: 'The new name of the reminder (max 255 characters)',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
			},
			{
				displayName: 'Recurrence Rule',
				name: 'recurrenceRule',
				type: 'string',
				default: '',
				placeholder: 'FREQ=DAILY;INTERVAL=1',
				description: 'ICalendar RFC 5545 recurrence rule',
				routing: {
					send: {
						type: 'body',
						property: 'recurrenceRule',
					},
				},
			},
			{
				displayName: 'Visibility',
				name: 'visibility',
				type: 'options',
				options: [
					{
						name: 'Public',
						value: 'public',
					},
					{
						name: 'Private',
						value: 'private',
					},
				],
				default: 'public',
				description: 'The visibility of the reminder',
				routing: {
					send: {
						type: 'body',
						property: 'visibility',
					},
				},
			},
			{
				displayName: 'Assigned Users',
				name: 'assignedUsers',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: 'Users to notify when the reminder is triggered (1-50 users)',
				options: [
					{
						displayName: 'User',
						name: 'userValues',
						values: [
							{
								displayName: 'Identifier Type',
								name: 'identifierType',
								type: 'options',
								options: [
									{
										name: 'User ID',
										value: 'id',
									},
									{
										name: 'Email',
										value: 'email',
									},
								],
								default: 'id',
								description: 'Whether to identify user by ID or email',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'The user ID or email address',
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'assignedUsers',
						value: '={{ $value.userValues?.map(u => u.identifierType === "email" ? { email: u.value } : { id: u.value }) || [] }}',
					},
				},
			},
		],
	},
];
