"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToGroupsDescription = void 0;
const displayOptions = {
    show: {
        resource: ['person'],
        operation: ['addToGroups'],
    },
};
async function mergeGroups(requestOptions) {
    var _a, _b, _c, _d;
    const personId = this.getNodeParameter('personId');
    const addGroups = this.getNodeParameter('addGroups');
    const response = (await this.helpers.httpRequestWithAuthentication.call(this, 'folkApi', {
        method: 'GET',
        url: `https://api.folk.app/v1/people/${personId}`,
    }));
    const groupsById = new Map();
    for (const group of (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.groups) !== null && _b !== void 0 ? _b : []) {
        groupsById.set(group.id, { id: group.id });
    }
    for (const group of (_c = addGroups.groupValues) !== null && _c !== void 0 ? _c : []) {
        if (group.id) {
            groupsById.set(group.id, { id: group.id });
        }
    }
    const body = ((_d = requestOptions.body) !== null && _d !== void 0 ? _d : {});
    body.groups = Array.from(groupsById.values());
    requestOptions.body = body;
    return requestOptions;
}
exports.addToGroupsDescription = [
    {
        displayName: 'Person ID',
        name: 'personId',
        type: 'string',
        default: '',
        required: true,
        displayOptions,
        description: 'The ID of the person to add to groups',
    },
    {
        displayName: 'Groups',
        name: 'addGroups',
        type: 'fixedCollection',
        typeOptions: {
            multipleValues: true,
        },
        default: {},
        required: true,
        displayOptions,
        description: 'Groups to add without removing the person from existing groups',
        options: [
            {
                displayName: 'Group',
                name: 'groupValues',
                values: [
                    {
                        displayName: 'Group Name or ID',
                        name: 'id',
                        type: 'options',
                        typeOptions: {
                            loadOptionsMethod: 'getGroups',
                        },
                        default: '',
                        required: true,
                        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                    },
                ],
            },
        ],
        routing: {
            send: {
                type: 'body',
                property: 'groups',
                value: '={{ $value.groupValues?.map(g => ({ id: g.id })) || [] }}',
                preSend: [mergeGroups],
            },
        },
    },
];
//# sourceMappingURL=addToGroups.operation.js.map