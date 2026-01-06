import type { INodeProperties } from 'n8n-workflow';
import { createDescription } from './create.operation';
import { deleteDescription } from './delete.operation';
import { getDescription } from './get.operation';
import { getManyDescription } from './getMany.operation';
import { updateDescription } from './update.operation';

const displayOnlyForNote = {
	show: {
		resource: ['note'],
	},
};

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: displayOnlyForNote,
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a note',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/notes',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a note',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/v1/notes/{{ $parameter.noteId }}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a note',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/notes/{{ $parameter.noteId }}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many notes',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/notes',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a note',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/v1/notes/{{ $parameter.noteId }}',
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
