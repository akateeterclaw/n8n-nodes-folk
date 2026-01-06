import type { INodeProperties } from 'n8n-workflow';
import { createDescription } from './create.operation';

const displayOnlyForInteraction = {
	show: {
		resource: ['interaction'],
	},
};

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: displayOnlyForInteraction,
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create an interaction',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/interactions',
					},
				},
			},
		],
		default: 'create',
	},
	...createDescription,
];
