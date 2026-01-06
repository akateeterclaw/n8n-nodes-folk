import type { INodeProperties } from 'n8n-workflow';
import { createDescription } from './create.operation';
import { deleteDescription } from './delete.operation';
import { getDescription } from './get.operation';
import { getManyDescription } from './getMany.operation';
import { updateDescription } from './update.operation';

const displayOnlyForReminder = {
	show: {
		resource: ['reminder'],
	},
};

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: displayOnlyForReminder,
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a reminder',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/reminders',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a reminder',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/v1/reminders/{{ $parameter.reminderId }}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a reminder',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/reminders/{{ $parameter.reminderId }}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many reminders',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/reminders',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a reminder',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/v1/reminders/{{ $parameter.reminderId }}',
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
