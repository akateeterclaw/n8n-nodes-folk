import type { INodeProperties } from 'n8n-workflow';
import { getManyDescription } from './getMany.operation';
import { getCustomFieldsDescription } from './getCustomFields.operation';

const displayOnlyForGroup = {
	show: {
		resource: ['group'],
	},
};

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: displayOnlyForGroup,
		options: [
			{
				name: 'Get Custom Fields',
				value: 'getCustomFields',
				action: 'Get custom fields for a group',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/groups/{{ $parameter.groupId }}/custom-fields/{{ $parameter.entityType }}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many groups',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/groups',
					},
				},
			},
		],
		default: 'getMany',
	},
	...getCustomFieldsDescription,
	...getManyDescription,
];
