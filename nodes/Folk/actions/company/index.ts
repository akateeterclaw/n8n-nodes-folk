import type { INodeProperties } from 'n8n-workflow';
import { createDescription } from './create.operation';
import { deleteDescription } from './delete.operation';
import { getDescription } from './get.operation';
import { getManyDescription } from './getMany.operation';
import { updateDescription } from './update.operation';

const displayOnlyForCompany = {
	show: {
		resource: ['company'],
	},
};

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: displayOnlyForCompany,
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a company',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/companies',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a company',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/v1/companies/{{ $parameter.companyId }}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a company',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/companies/{{ $parameter.companyId }}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many companies',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/companies',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a company',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/v1/companies/{{ $parameter.companyId }}',
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
