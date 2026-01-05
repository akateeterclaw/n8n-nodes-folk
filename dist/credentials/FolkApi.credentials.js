"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolkApi = void 0;
class FolkApi {
    constructor() {
        this.name = 'folkApi';
        this.displayName = 'Folk API';
        this.icon = { light: 'file:../icons/folk.svg', dark: 'file:../icons/folk.dark.svg' };
        this.documentationUrl = 'https://developer.folk.app/guides/quick-start';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                description: 'Your Folk API key from workspace settings',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '=Bearer {{$credentials?.apiKey}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://api.folk.app',
                url: '/v1/groups',
                method: 'GET',
            },
        };
    }
}
exports.FolkApi = FolkApi;
//# sourceMappingURL=FolkApi.credentials.js.map