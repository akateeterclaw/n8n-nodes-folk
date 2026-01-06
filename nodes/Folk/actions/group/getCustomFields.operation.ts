import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['group'],
		operation: ['getCustomFields'],
	},
};

export const getCustomFieldsDescription: INodeProperties[] = [
	{
		displayName: 'Group Name or ID',
		name: 'groupId',
		type: 'options',
		required: true,
		default: '',
		displayOptions,
		description: 'The group to get custom fields for. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		typeOptions: {
			loadOptionsMethod: 'getGroups',
		},
	},
];
