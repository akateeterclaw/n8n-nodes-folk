import type {
	IDataObject,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['person'],
		operation: ['updateCustomFields'],
	},
};

interface FolkPersonResponse {
	data?: {
		customFieldValues?: IDataObject;
	};
}

async function mergeCustomFieldValues(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const personId = this.getNodeParameter('personId') as string;
	const groupId = this.getNodeParameter('groupId') as string;
	const customFieldUpdates = this.getNodeParameter('customFieldUpdates') as {
		fieldValues?: Array<{ fieldName: string; value: unknown }>;
	};
	const response = (await this.helpers.httpRequestWithAuthentication.call(
		this,
		'folkApi',
		{
			method: 'GET',
			url: `https://api.folk.app/v1/people/${personId}`,
		},
	)) as FolkPersonResponse;
	const existingCustomFieldValues = response.data?.customFieldValues ?? {};
	const existingGroupValues = (existingCustomFieldValues[groupId] ?? {}) as IDataObject;
	const updatedGroupValues: IDataObject = { ...existingGroupValues };

	for (const field of customFieldUpdates.fieldValues ?? []) {
		if (field.fieldName) {
			updatedGroupValues[field.fieldName] = field.value as IDataObject[string];
		}
	}

	const body = (requestOptions.body ?? {}) as IDataObject;
	body.customFieldValues = {
		...existingCustomFieldValues,
		[groupId]: updatedGroupValues,
	};
	requestOptions.body = body;

	return requestOptions;
}

export const updateCustomFieldsDescription: INodeProperties[] = [
	{
		displayName: 'Person ID',
		name: 'personId',
		type: 'string',
		default: '',
		required: true,
		displayOptions,
		description: 'The ID of the person whose custom fields to update',
	},
	{
		displayName: 'Group Name or ID',
		name: 'groupId',
		type: 'options',
		required: true,
		default: '',
		displayOptions,
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		typeOptions: {
			loadOptionsMethod: 'getGroups',
		},
	},
	{
		displayName: 'Custom Fields',
		name: 'customFieldUpdates',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		required: true,
		displayOptions,
		description: 'Select custom fields from the group and provide their new values',
		options: [
			{
				displayName: 'Custom Field',
				name: 'fieldValues',
				values: [
					{
						displayName: 'Custom Field Name or ID',
						name: 'fieldName',
						type: 'options',
						required: true,
						default: '',
						typeOptions: {
							loadOptionsMethod: 'getGroupCustomFields',
							loadOptionsDependsOn: ['groupId'],
						},
						description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'The value to set. Supports expressions for dates, numbers, booleans, lists, and objects.',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'customFieldValues',
				preSend: [mergeCustomFieldValues],
			},
		},
	},
];
