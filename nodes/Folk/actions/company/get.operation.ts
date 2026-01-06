import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['company'],
		operation: ['get'],
	},
};

export const getDescription: INodeProperties[] = [
	{
		displayName: 'Company ID',
		name: 'companyId',
		type: 'string',
		default: '',
		required: true,
		displayOptions,
		description: 'The ID of the company to retrieve',
	},
];
