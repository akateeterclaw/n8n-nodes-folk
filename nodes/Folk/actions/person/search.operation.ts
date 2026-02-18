import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['person'],
		operation: ['search'],
	},
};

export const searchDescription: INodeProperties[] = [
	{
		displayName: 'Emails',
		name: 'emails',
		type: 'string',
		default: [],
		placeholder: 'name@example.com',
		displayOptions,
		description: 'One or more emails to search for. Adds filter[emails][eq] query parameters.',
		typeOptions: {
			multipleValues: true,
			multipleValueButtonText: 'Add Email',
		},
		routing: {
			send: {
				type: 'query',
				property: 'filter[emails][eq]',
			},
		},
	},
	{
		displayName: 'Phones',
		name: 'phones',
		type: 'string',
		default: [],
		placeholder: '+14065551234',
		displayOptions,
		description: 'One or more phone numbers to search for. Adds filter[phones][eq] query parameters.',
		typeOptions: {
			multipleValues: true,
			multipleValueButtonText: 'Add Phone',
		},
		routing: {
			send: {
				type: 'query',
				property: 'filter[phones][eq]',
			},
		},
	},
	{
		displayName: 'Combinator',
		name: 'combinator',
		type: 'options',
		default: 'or',
		displayOptions,
		description: 'How to combine multiple filters (emails + phones + repeated values).',
		options: [
			{ name: 'AND', value: 'and' },
			{ name: 'OR', value: 'or' },
		],
		routing: {
			send: {
				type: 'query',
				property: 'combinator',
			},
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
				resource: ['person'],
				operation: ['search'],
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