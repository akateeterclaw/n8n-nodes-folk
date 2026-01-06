"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Folk = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const person = __importStar(require("./actions/person"));
const company = __importStar(require("./actions/company"));
const deal = __importStar(require("./actions/deal"));
const group = __importStar(require("./actions/group"));
const user = __importStar(require("./actions/user"));
const note = __importStar(require("./actions/note"));
const reminder = __importStar(require("./actions/reminder"));
const interaction = __importStar(require("./actions/interaction"));
const webhook = __importStar(require("./actions/webhook"));
const loadOptions_1 = require("./methods/loadOptions");
class Folk {
    constructor() {
        this.description = {
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
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
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
        this.methods = {
            loadOptions: {
                getGroups: loadOptions_1.getGroups,
                getGroupObjectTypes: loadOptions_1.getGroupObjectTypes,
                getUsers: loadOptions_1.getUsers,
            },
        };
    }
}
exports.Folk = Folk;
//# sourceMappingURL=Folk.node.js.map