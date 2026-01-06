import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['webhook'],
		operation: ['get'],
	},
};

export const getDescription: INodeProperties[] = [
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'The ID of the webhook to retrieve',
	},
];
