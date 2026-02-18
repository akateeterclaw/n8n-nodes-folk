import type { INodeProperties } from 'n8n-workflow';

import { createDescription } from './create.operation';
import { deleteDescription } from './delete.operation';
import { getDescription } from './get.operation';
import { getManyDescription } from './getMany.operation';
import { searchDescription } from './search.operation';
import { updateDescription } from './update.operation';

const displayOnlyForPerson = {
	show: {
		resource: ['person'],
	},
};

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: displayOnlyForPerson,
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a person',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/people',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a person',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/v1/people/{{ $parameter.personId }}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a person',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/people/{{ $parameter.personId }}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many people',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/people',
					},
				},
			},
			{
				name: 'Search',
				value: 'search',
				action: 'Search people',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/people',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a person',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/v1/people/{{ $parameter.personId }}',
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
	...searchDescription,
	...updateDescription,
];