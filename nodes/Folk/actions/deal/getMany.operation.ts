import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['deal'],
		operation: ['getMany'],
	},
};

export const getManyDescription: INodeProperties[] = [
	{
		displayName: 'Group Name or ID',
		name: 'groupId',
		type: 'options',
		required: true,
		default: '',
		displayOptions,
		description: 'The group containing the deals. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		typeOptions: {
			loadOptionsMethod: 'getGroups',
		},
	},
	{
		displayName: 'Object Type Name or ID',
		name: 'objectType',
		type: 'options',
		required: true,
		default: '',
		displayOptions,
		description: 'The custom object type for deals in this group. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
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
