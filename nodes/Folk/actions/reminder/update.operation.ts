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
				description: 'iCalendar RFC 5545 recurrence rule',
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
				displayName: 'Assigned User IDs',
				name: 'assignedUsers',
				type: 'string',
				default: '',
				description: 'Comma-separated list of user IDs to assign to this reminder',
				routing: {
					send: {
						type: 'body',
						property: 'assignedUsers',
						value: '={{ $value ? $value.split(",").map(id => ({ id: id.trim() })) : [] }}',
					},
				},
			},
		],
	},
];
