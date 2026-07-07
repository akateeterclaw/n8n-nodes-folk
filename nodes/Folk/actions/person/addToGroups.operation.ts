import type {
	IDataObject,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['person'],
		operation: ['addToGroups'],
	},
};

interface FolkPersonResponse {
	data?: {
		groups?: Array<{
			id: string;
		}>;
	};
}

async function mergeGroups(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const personId = this.getNodeParameter('personId') as string;
	const addGroups = this.getNodeParameter('addGroups') as {
		groupValues?: Array<{ id: string }>;
	};
	const response = (await this.helpers.httpRequestWithAuthentication.call(
		this,
		'folkApi',
		{
			method: 'GET',
			url: `https://api.folk.app/v1/people/${personId}`,
		},
	)) as FolkPersonResponse;
	const groupsById = new Map<string, { id: string }>();

	for (const group of response.data?.groups ?? []) {
		groupsById.set(group.id, { id: group.id });
	}

	for (const group of addGroups.groupValues ?? []) {
		if (group.id) {
			groupsById.set(group.id, { id: group.id });
		}
	}

	const body = (requestOptions.body ?? {}) as IDataObject;
	body.groups = Array.from(groupsById.values());
	requestOptions.body = body;

	return requestOptions;
}

export const addToGroupsDescription: INodeProperties[] = [
	{
		displayName: 'Person ID',
		name: 'personId',
		type: 'string',
		default: '',
		required: true,
		displayOptions,
		description: 'The ID of the person to add to groups',
	},
	{
		displayName: 'Groups',
		name: 'addGroups',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		required: true,
		displayOptions,
		description: 'Groups to add without removing the person from existing groups',
		options: [
			{
				displayName: 'Group',
				name: 'groupValues',
				values: [
					{
						displayName: 'Group Name or ID',
						name: 'id',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getGroups',
						},
						default: '',
						required: true,
						description:
							'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'groups',
				value: '={{ $value.groupValues?.map(g => ({ id: g.id })) || [] }}',
				preSend: [mergeGroups],
			},
		},
	},
];
