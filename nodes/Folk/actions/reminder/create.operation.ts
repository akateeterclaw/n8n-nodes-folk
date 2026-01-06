import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['reminder'],
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
		description: 'The name of the reminder (max 255 characters)',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Entity ID',
		name: 'entityId',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'The ID of the person or company to attach this reminder to',
		routing: {
			send: {
				type: 'body',
				property: 'entity.id',
			},
		},
	},
	{
		displayName: 'Recurrence Rule',
		name: 'recurrenceRule',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		placeholder: 'DTSTART;TZID=Europe/Paris:20250717T090000\\nRRULE:FREQ=WEEKLY;INTERVAL=1',
		description: 'ICalendar RFC 5545 recurrence rule. Format: DTSTART;TZID=timezone:dateT time\\nRRULE:params. Examples: FREQ=DAILY;INTERVAL=1, FREQ=WEEKLY;BYDAY=MO,WE,FR',
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
		required: true,
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
		displayOptions,
		description: 'The visibility of the reminder. Public reminders are visible to all workspace users.',
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
		displayOptions,
		description: 'Users to notify when the reminder is triggered (required for public reminders, 1-50 users)',
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
];
