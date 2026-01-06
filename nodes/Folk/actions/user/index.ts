import type { INodeProperties } from 'n8n-workflow';
import { getDescription } from './get.operation';
import { getManyDescription } from './getMany.operation';
import { getCurrentDescription } from './getCurrent.operation';

const displayOnlyForUser = {
	show: {
		resource: ['user'],
	},
};

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: displayOnlyForUser,
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a user',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/users/{{ $parameter.userId }}',
					},
				},
			},
			{
				name: 'Get Current',
				value: 'getCurrent',
				action: 'Get the current user',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/users/me',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many users',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/users',
					},
				},
			},
		],
		default: 'getMany',
	},
	...getDescription,
	...getCurrentDescription,
	...getManyDescription,
];
