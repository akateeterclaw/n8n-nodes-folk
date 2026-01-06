import type {
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

export async function getGroups(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const response = await this.helpers.requestWithAuthentication.call(
		this,
		'folkApi',
		{
			method: 'GET',
			url: 'https://api.folk.app/v1/groups',
			qs: { limit: 100 },
			json: true,
		},
	);

	const groups = response.data?.items || [];
	return groups.map((group: { id: string; name: string }) => ({
		name: group.name,
		value: group.id,
	}));
}

export async function getGroupObjectTypes(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const groupId = this.getCurrentNodeParameter('groupId') as string;

	if (!groupId) {
		return [];
	}

	const response = await this.helpers.requestWithAuthentication.call(
		this,
		'folkApi',
		{
			method: 'GET',
			url: `https://api.folk.app/v1/groups/${groupId}/customFields`,
			json: true,
		},
	);

	const customFields = response.data?.items || [];
	return customFields
		.filter((field: { type: string }) => field.type === 'object')
		.map((field: { name: string }) => ({
			name: field.name,
			value: field.name,
		}));
}

export async function getUsers(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const response = await this.helpers.requestWithAuthentication.call(
		this,
		'folkApi',
		{
			method: 'GET',
			url: 'https://api.folk.app/v1/users',
			qs: { limit: 100 },
			json: true,
		},
	);

	const users = response.data?.items || [];
	return users.map((user: { id: string; fullName: string; email: string }) => ({
		name: `${user.fullName} (${user.email})`,
		value: user.id,
	}));
}
