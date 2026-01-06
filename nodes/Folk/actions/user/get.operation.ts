import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['user'],
		operation: ['get'],
	},
};

export const getDescription: INodeProperties[] = [
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'The ID of the user to retrieve',
	},
];
