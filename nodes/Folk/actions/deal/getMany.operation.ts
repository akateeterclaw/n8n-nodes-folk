import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['deal'],
		operation: ['getMany'],
	},
};

export const getManyDescription: INodeProperties[] = [
	{
		displayName: 'Group',
		name: 'groupId',
		type: 'options',
		required: true,
		default: '',
		displayOptions,
		description: 'The group containing the deals',
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
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['getMany'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
		routing: {
			send: {
				type: 'query',
				property: 'limit',
			},
		},
	},
];
