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

interface FolkCustomField {
	name: string;
	type?: string;
}

interface FolkCustomFieldsResponse {
	data?: {
		items?: FolkCustomField[];
	};
}

function isIdObject(value: unknown): value is IDataObject {
	return typeof value === 'object' && value !== null && typeof (value as IDataObject).id === 'string';
}

function normalizeContactFieldValue(value: unknown): unknown {
	if (Array.isArray(value)) {
		return value
			.map((item) => {
				if (isIdObject(item)) {
					return { id: item.id };
				}

				if (typeof item === 'string' && item.length > 0) {
					return { id: item };
				}

				return item;
			})
			.filter((item): item is IDataObject => isIdObject(item));
	}

	if (isIdObject(value)) {
		return { id: value.id };
	}

	if (typeof value === 'string' && value.length > 0) {
		return [{ id: value }];
	}

	return value;
}

async function getContactFieldNames(
	this: IExecuteSingleFunctions,
	groupId: string,
): Promise<Set<string>> {
	const response = (await this.helpers.httpRequestWithAuthentication.call(
		this,
		'folkApi',
		{
			method: 'GET',
			url: `https://api.folk.app/v1/groups/${groupId}/custom-fields/person`,
			qs: { limit: 100 },
		},
	)) as FolkCustomFieldsResponse;
	const fields = response.data?.items ?? [];

	return new Set(
		fields
			.filter((field) => field.type === 'contactField')
			.map((field) => field.name),
	);
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
	const contactFieldNames = await getContactFieldNames.call(this, groupId);

	for (const field of customFieldUpdates.fieldValues ?? []) {
		if (field.fieldName) {
			updatedGroupValues[field.fieldName] = contactFieldNames.has(field.fieldName)
				? (normalizeContactFieldValue(field.value) as IDataObject[string])
				: (field.value as IDataObject[string]);
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
