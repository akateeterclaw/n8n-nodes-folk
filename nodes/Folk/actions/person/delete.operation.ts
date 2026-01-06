import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['person'],
		operation: ['delete'],
	},
};

export const deleteDescription: INodeProperties[] = [
	{
		displayName: 'Person ID',
		name: 'personId',
		type: 'string',
		default: '',
		required: true,
		displayOptions,
		description: 'The ID of the person to delete',
	},
];
