import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['note'],
		operation: ['get'],
	},
};

export const getDescription: INodeProperties[] = [
	{
		displayName: 'Note ID',
		name: 'noteId',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'The ID of the note to retrieve',
	},
];
