import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['company'],
		operation: ['update'],
	},
};

export const updateDescription: INodeProperties[] = [
	{
		displayName: 'Company ID',
		name: 'companyId',
		type: 'string',
		default: '',
		required: true,
		displayOptions,
		description: 'The ID of the company to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions,
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the company',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description: 'Brief description of the company',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Employee Range',
				name: 'employeeRange',
				type: 'options',
				default: '1-10',
				options: [
					{ name: '1-10', value: '1-10' },
					{ name: '11-50', value: '11-50' },
					{ name: '51-200', value: '51-200' },
					{ name: '201-500', value: '201-500' },
					{ name: '501-1000', value: '501-1000' },
					{ name: '1001-5000', value: '1001-5000' },
					{ name: '5001-10000', value: '5001-10000' },
					{ name: '10000+', value: '10000+' },
				],
				description: 'Number of employees',
				routing: {
					send: {
						type: 'body',
						property: 'employeeRange',
					},
				},
			},
			{
				displayName: 'Foundation Year',
				name: 'foundationYear',
				type: 'string',
				default: '',
				placeholder: '2020',
				description: 'Year the company was founded (YYYY format)',
				routing: {
					send: {
						type: 'body',
						property: 'foundationYear',
					},
				},
			},
			{
				displayName: 'Industry',
				name: 'industry',
				type: 'string',
				default: '',
				description: 'Industry or sector of the company',
				routing: {
					send: {
						type: 'body',
						property: 'industry',
					},
				},
			},
		],
	},
];
