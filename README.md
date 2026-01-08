<img src="https://raw.githubusercontent.com/pemontto/n8n-nodes-spur/main/icons/spur.svg" width="120" alt="Spur Logo" />

# n8n-nodes-spur

This is an n8n community node for [Spur.us](https://spur.us), an IP intelligence and threat detection service. It lets you get context and threat intelligence for IP addresses in your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

- **Get IP Context**: Retrieve detailed threat intelligence and context for an IP address, including:
  - Organization and infrastructure type
  - AS (Autonomous System) information
  - Geographic location data
  - Detected behaviors (file sharing, Tor usage, etc.)
  - Risk indicators (proxy, VPN, tunnel, geo mismatch, etc.)
  - VPN/Proxy service identification
  - Optional: Historical date lookup (requires subscription with historical access)

- **Get Tag Metadata**: Get metrics and analysis for a service tag (e.g., `NORDVPN`, `OXYLABS_PROXY`)

- **Get Token Status**: Check remaining API queries and service tier

## Credentials

You need a Spur API token to use this node.

### Getting your API Token

1. Sign up for a [Spur account](https://spur.us)
2. Navigate to your dashboard
3. Find your API token in the API settings section
4. Copy the token and use it in n8n

## Compatibility

Compatible with n8n@1.60.0 or later

## Usage

### Example: Check if an IP is a VPN or Proxy

1. Add the **Spur** node to your workflow
2. Configure your Spur API credentials
3. Enter an IP address (e.g., from a webhook or previous node)
4. The node returns comprehensive IP context including:
   - Whether the IP is a known VPN/proxy exit
   - The VPN/proxy service name (if detected)
   - Risk indicators and behaviors
   - Geographic data

### Response Fields

The API returns rich data including:

| Field | Description |
|-------|-------------|
| `ip` | The queried IP address |
| `organization` | ISP or organization name |
| `infrastructure` | Infrastructure type (e.g., DATACENTER, RESIDENTIAL) |
| `as.number` | Autonomous System Number |
| `as.organization` | AS organization name |
| `location` | City, country, state |
| `client.behaviors` | Detected behaviors (FILE_SHARING, TOR_PROXY_USER, etc.) |
| `risks` | Risk indicators (CALLBACK_PROXY, TUNNEL, GEO_MISMATCH, etc.) |
| `tunnels` | VPN/tunnel details including operator and type |

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Spur API documentation](https://docs.spur.us/context-api)
* [Spur website](https://spur.us)
