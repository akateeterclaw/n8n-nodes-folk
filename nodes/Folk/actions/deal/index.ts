import type { INodeProperties } from 'n8n-workflow';
import { createDescription } from './create.operation';
import { deleteDescription } from './delete.operation';
import { getDescription } from './get.operation';
import { getManyDescription } from './getMany.operation';
import { updateDescription } from './update.operation';

const displayOnlyForDeal = {
	show: {
		resource: ['deal'],
	},
};

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: displayOnlyForDeal,
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a deal',
				routing: {
					request: {
						method: 'POST',
						url: '=/v1/groups/{{ $parameter.groupId }}/{{ $parameter.objectType }}',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a deal',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/v1/groups/{{ $parameter.groupId }}/{{ $parameter.objectType }}/{{ $parameter.dealId }}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a deal',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/groups/{{ $parameter.groupId }}/{{ $parameter.objectType }}/{{ $parameter.dealId }}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many deals',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/groups/{{ $parameter.groupId }}/{{ $parameter.objectType }}',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a deal',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/v1/groups/{{ $parameter.groupId }}/{{ $parameter.objectType }}/{{ $parameter.dealId }}',
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
