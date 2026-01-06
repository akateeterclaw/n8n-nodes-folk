import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['reminder'],
		operation: ['get'],
	},
};

export const getDescription: INodeProperties[] = [
	{
		displayName: 'Reminder ID',
		name: 'reminderId',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'The ID of the reminder to retrieve',
	},
];
