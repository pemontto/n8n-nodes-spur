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
					{
						name: 'Get IP Context (Historical)',
						value: 'getIpContextHistorical',
						action: 'Get historical IP context',
						description: 'Get IP context for a specific historical date (Enterprise only)',
						routing: {
							request: {
								method: 'GET',
								url: '=/context/{{$parameter.ipAddress}}',
								qs: {
									dt: '={{$parameter.date.replace(/-/g, "")}}',
								},
							},
						},
					},
					{
						name: 'Get Tag Metadata',
						value: 'getTagMetadata',
						action: 'Get tag metadata',
						description: 'Get metrics and analysis for a service tag',
						routing: {
							request: {
								method: 'GET',
								url: '=/metadata/tags/{{$parameter.tag}}',
							},
						},
					},
					{
						name: 'Get Token Status',
						value: 'getTokenStatus',
						action: 'Get API token status',
						description: 'Check remaining queries and service tier',
						routing: {
							request: {
								method: 'GET',
								baseURL: 'https://api.spur.us',
								url: '/status',
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
				description: 'The IP address to look up (IPv4 or IPv6)',
				displayOptions: {
					show: {
						operation: ['getIpContext', 'getIpContextHistorical'],
					},
				},
			},
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				required: true,
				default: '',
				description: 'The historical date to look up IP context for',
				displayOptions: {
					show: {
						operation: ['getIpContextHistorical'],
					},
				},
			},
			{
				displayName: 'Tag',
				name: 'tag',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'e.g., NORDVPN, OXYLABS_PROXY',
				description: 'The service tag to get metadata for',
				displayOptions: {
					show: {
						operation: ['getTagMetadata'],
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
						operation: ['getIpContext', 'getIpContextHistorical'],
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
