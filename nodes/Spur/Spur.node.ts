import {
	NodeConnectionTypes,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

export class Spur implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Spur',
		name: 'spur',
		icon: { light: 'file:../../icons/spur.svg', dark: 'file:../../icons/spur.dark.svg' },
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Get IP context and threat intelligence from Spur.us',
		defaults: {
			name: 'Spur',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'spurApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.spur.us/v2',
			headers: {
				Accept: 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get IP Context',
						value: 'getIpContext',
						action: 'Get IP context',
						description: 'Get threat intelligence and context for an IP address',
						routing: {
							request: {
								method: 'GET',
								url: '=/context/{{$parameter.ipAddress}}',
							},
						},
					},
				],
				default: 'getIpContext',
			},
			{
				displayName: 'IP Address',
				name: 'ipAddress',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'e.g., 8.8.8.8',
				description: 'The IP address to look up',
				displayOptions: {
					show: {
						operation: ['getIpContext'],
					},
				},
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: {
					show: {
						operation: ['getIpContext'],
					},
				},
				options: [
					{
						displayName: 'Simplify Response',
						name: 'simplify',
						type: 'boolean',
						default: false,
						description: 'Whether to return a simplified response with key fields only',
					},
				],
			},
		],
	};
}
