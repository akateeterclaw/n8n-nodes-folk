import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['company'],
		operation: ['delete'],
	},
};

export const deleteDescription: INodeProperties[] = [
	{
		displayName: 'Company ID',
		name: 'companyId',
		type: 'string',
		default: '',
		required: true,
		displayOptions,
		description: 'The ID of the company to delete',
	},
];
