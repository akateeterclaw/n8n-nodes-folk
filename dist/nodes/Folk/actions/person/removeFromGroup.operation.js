"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromGroupDescription = void 0;
const displayOptions = {
    show: {
        resource: ['person'],
        operation: ['removeFromGroup'],
    },
};
async function removeGroup(requestOptions) {
    var _a, _b, _c;
    const personId = this.getNodeParameter('personId');
    const groupId = this.getNodeParameter('groupId');
    const response = (await this.helpers.httpRequestWithAuthentication.call(this, 'folkApi', {
        method: 'GET',
        url: `https://api.folk.app/v1/people/${personId}`,
    }));
    const remainingGroups = ((_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.groups) !== null && _b !== void 0 ? _b : [])
        .filter((group) => group.id !== groupId)
        .map((group) => ({ id: group.id }));
    const body = ((_c = requestOptions.body) !== null && _c !== void 0 ? _c : {});
    body.groups = remainingGroups;
    requestOptions.body = body;
    return requestOptions;
}
exports.removeFromGroupDescription = [
    {
        displayName: 'Person ID',
        name: 'personId',
        type: 'string',
        default: '',
        required: true,
        displayOptions,
        description: 'The ID of the person to remove from the group',
    },
    {
        displayName: 'Group Name or ID',
        name: 'groupId',
        type: 'options',
        typeOptions: {
            loadOptionsMethod: 'getGroups',
        },
        default: '',
        required: true,
        displayOptions,
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        routing: {
            send: {
                type: 'body',
                property: 'groups',
                value: '={{ [{ id: $value }] }}',
                preSend: [removeGroup],
            },
        },
    },
];
//# sourceMappingURL=removeFromGroup.operation.js.map
