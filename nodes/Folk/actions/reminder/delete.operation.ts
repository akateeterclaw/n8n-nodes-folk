import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['reminder'],
		operation: ['delete'],
	},
};

export const deleteDescription: INodeProperties[] = [
	{
		displayName: 'Reminder ID',
		name: 'reminderId',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'The ID of the reminder to delete',
	},
];
