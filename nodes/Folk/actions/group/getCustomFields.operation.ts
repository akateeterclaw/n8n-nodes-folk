import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['group'],
		operation: ['getCustomFields'],
	},
};

export const getCustomFieldsDescription: INodeProperties[] = [
	{
		displayName: 'Group',
		name: 'groupId',
		type: 'options',
		required: true,
		default: '',
		displayOptions,
		description: 'The group to get custom fields for',
		typeOptions: {
			loadOptionsMethod: 'getGroups',
		},
	},
];
