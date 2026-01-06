import type { INodeProperties } from 'n8n-workflow';
import { createDescription } from './create.operation';
import { deleteDescription } from './delete.operation';
import { getDescription } from './get.operation';
import { getManyDescription } from './getMany.operation';
import { updateDescription } from './update.operation';

const displayOnlyForWebhook = {
	show: {
		resource: ['webhook'],
	},
};

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: displayOnlyForWebhook,
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a webhook',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/webhooks',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a webhook',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/v1/webhooks/{{ $parameter.webhookId }}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a webhook',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/webhooks/{{ $parameter.webhookId }}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many webhooks',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/webhooks',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a webhook',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/v1/webhooks/{{ $parameter.webhookId }}',
					},
				},
			},
		],
		default: 'getMany',
	},
	...createDescription,
	...deleteDescription,
	...getDescription,
	...getManyDescription,
	...updateDescription,
];
