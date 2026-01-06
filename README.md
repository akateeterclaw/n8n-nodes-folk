# n8n-nodes-folk

This is an n8n community node for [Folk CRM](https://folk.app). It allows you to automate your Folk CRM workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Folk (Action Node)

| Resource | Operations |
|----------|------------|
| **Person** | Create, Get, Get Many, Update, Delete |
| **Company** | Create, Get, Get Many, Update, Delete |
| **Deal** | Create, Get, Get Many, Update, Delete |
| **Group** | Get Many, Get Custom Fields |
| **User** | Get, Get Current, Get Many |
| **Note** | Create, Get, Get Many, Update, Delete |
| **Reminder** | Create, Get, Get Many, Update, Delete |
| **Interaction** | Create |
| **Webhook** | Create, Get, Get Many, Update, Delete |

### Folk Trigger

Receive real-time events from Folk CRM:

- Person Created / Updated / Deleted
- Company Created / Updated / Deleted
- Object Created / Updated / Deleted

## Credentials

You need a Folk API key to use this node:

1. Log in to your Folk account
2. Go to **Settings** > **Integrations** > **API**
3. Generate a new API key
4. In n8n, create new **Folk API** credentials and paste your API key

## Compatibility

Compatible with n8n@1.60.0 or later

## Resources

- [Folk API Documentation](https://developer.folk.app)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
