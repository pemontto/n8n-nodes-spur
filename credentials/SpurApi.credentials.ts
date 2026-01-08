import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SpurApi implements ICredentialType {
	name = 'spurApi';

	displayName = 'Spur API';

	icon: Icon = { light: 'file:../icons/spur.svg', dark: 'file:../icons/spur.dark.svg' };

	documentationUrl = 'https://docs.spur.us/context-api';

	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Your Spur API token from the Spur dashboard',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Token: '={{$credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.spur.us/v2',
			url: '/context/8.8.8.8',
			method: 'GET',
		},
	};
}
