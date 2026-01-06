import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['deal'],
		operation: ['create'],
	},
};

export const createDescription: INodeProperties[] = [
	{
		displayName: 'Group',
		name: 'groupId',
		type: 'options',
		required: true,
		default: '',
		displayOptions,
		description: 'The group to create the deal in',
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
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions,
		description: 'The name of the deal',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions,
		options: [
			{
				displayName: 'Company IDs',
				name: 'companies',
				type: 'string',
				default: '',
				description: 'Comma-separated list of company IDs to associate with this deal',
				routing: {
					send: {
						type: 'body',
						property: 'companies',
						value: '={{ $value ? $value.split(",").map(id => id.trim()) : [] }}',
					},
				},
			},
			{
				displayName: 'Person IDs',
				name: 'people',
				type: 'string',
				default: '',
				description: 'Comma-separated list of person IDs to associate with this deal',
				routing: {
					send: {
						type: 'body',
						property: 'people',
						value: '={{ $value ? $value.split(",").map(id => id.trim()) : [] }}',
					},
				},
			},
		],
	},
];
