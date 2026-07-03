import type {
	IDataObject,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['person'],
		operation: ['removeFromGroup'],
	},
};

interface FolkPersonResponse {
	data?: {
		groups?: Array<{
			id: string;
		}>;
	};
}

async function removeGroup(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const personId = this.getNodeParameter('personId') as string;
	const groupId = this.getNodeParameter('groupId') as string;
	const response = (await this.helpers.httpRequestWithAuthentication.call(
		this,
		'folkApi',
		{
			method: 'GET',
			url: `https://api.folk.app/v1/people/${personId}`,
		},
	)) as FolkPersonResponse;
	const remainingGroups = (response.data?.groups ?? [])
		.filter((group) => group.id !== groupId)
		.map((group) => ({ id: group.id }));

	const body = (requestOptions.body ?? {}) as IDataObject;
	body.groups = remainingGroups;
	requestOptions.body = body;

	return requestOptions;
}

export const removeFromGroupDescription: INodeProperties[] = [
	{
		displayName: 'Person ID',
		name: 'personId',
		type: 'string',
		default: '',
		required: true,
		displayOptions,
		description: 'The ID of the person to remove from the group',
	},
	{
		displayName: 'Group Name or ID',
		name: 'groupId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getGroups',
		},
		default: '',
		required: true,
		displayOptions,
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		routing: {
			send: {
				type: 'body',
				property: 'groups',
				value: '={{ [{ id: $value }] }}',
				preSend: [removeGroup],
			},
		},
	},
];
