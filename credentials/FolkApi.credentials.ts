import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class FolkApi implements ICredentialType {
	name = 'folkApi';

	displayName = 'Folk API';

	icon: Icon = { light: 'file:../icons/folk.svg', dark: 'file:../icons/folk.dark.svg' };

	documentationUrl = 'https://developer.folk.app/guides/quick-start';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Your Folk API key from workspace settings',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials?.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.folk.app',
			url: '/v1/groups',
			method: 'GET',
		},
	};
}
