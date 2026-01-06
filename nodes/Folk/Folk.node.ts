import {
	NodeConnectionTypes,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

import * as person from './actions/person';
import * as company from './actions/company';
import * as deal from './actions/deal';
import * as group from './actions/group';
import * as user from './actions/user';
import * as note from './actions/note';
import * as reminder from './actions/reminder';
import * as interaction from './actions/interaction';
import * as webhook from './actions/webhook';

import { getGroups, getGroupObjectTypes, getUsers } from './methods/loadOptions';

export class Folk implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Folk',
		name: 'folk',
		icon: { light: 'file:../../icons/folk.svg', dark: 'file:../../icons/folk.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Folk CRM API',
		defaults: {
			name: 'Folk',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'folkApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.folk.app',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Company',
						value: 'company',
					},
					{
						name: 'Deal',
						value: 'deal',
					},
					{
						name: 'Group',
						value: 'group',
					},
					{
						name: 'Interaction',
						value: 'interaction',
					},
					{
						name: 'Note',
						value: 'note',
					},
					{
						name: 'Person',
						value: 'person',
					},
					{
						name: 'Reminder',
						value: 'reminder',
					},
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Webhook',
						value: 'webhook',
					},
				],
				default: 'person',
			},
			...company.descriptions,
			...deal.descriptions,
			...group.descriptions,
			...interaction.descriptions,
			...note.descriptions,
			...person.descriptions,
			...reminder.descriptions,
			...user.descriptions,
			...webhook.descriptions,
		],
	};

	methods = {
		loadOptions: {
			getGroups,
			getGroupObjectTypes,
			getUsers,
		},
	};
}
