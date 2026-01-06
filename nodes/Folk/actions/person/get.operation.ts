import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['person'],
		operation: ['get'],
	},
};

export const getDescription: INodeProperties[] = [
	{
		displayName: 'Person ID',
		name: 'personId',
		type: 'string',
		default: '',
		required: true,
		displayOptions,
		description: 'The ID of the person to retrieve',
	},
];
