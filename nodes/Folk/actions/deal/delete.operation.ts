import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['deal'],
		operation: ['delete'],
	},
};

export const deleteDescription: INodeProperties[] = [
	{
		displayName: 'Group',
		name: 'groupId',
		type: 'options',
		required: true,
		default: '',
		displayOptions,
		description: 'The group containing the deal',
		typeOptions: {
			loadOptionsMethod: 'getGroups',
		},
	},
	{
		displayName: 'Object Type',
		name: 'objectType',
		type: 'options',
		required: true,
		default: '',
		displayOptions,
		description: 'The custom object type for deals in this group',
		typeOptions: {
			loadOptionsMethod: 'getGroupObjectTypes',
			loadOptionsDependsOn: ['groupId'],
		},
	},
	{
		displayName: 'Deal ID',
		name: 'dealId',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'The ID of the deal to delete',
	},
];
