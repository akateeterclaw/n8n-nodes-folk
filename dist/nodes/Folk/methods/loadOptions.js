"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroups = getGroups;
exports.getGroupObjectTypes = getGroupObjectTypes;
exports.getUsers = getUsers;
async function getGroups() {
    var _a;
    const response = await this.helpers.httpRequestWithAuthentication.call(this, 'folkApi', {
        method: 'GET',
        url: 'https://api.folk.app/v1/groups',
        qs: { limit: 100 },
    });
    const groups = ((_a = response.data) === null || _a === void 0 ? void 0 : _a.items) || [];
    return groups.map((group) => ({
        name: group.name,
        value: group.id,
    }));
}
async function getGroupObjectTypes() {
    var _a;
    const groupId = this.getCurrentNodeParameter('groupId');
    if (!groupId) {
        return [];
    }
    const response = await this.helpers.httpRequestWithAuthentication.call(this, 'folkApi', {
        method: 'GET',
        url: `https://api.folk.app/v1/groups/${groupId}/customFields`,
    });
    const customFields = ((_a = response.data) === null || _a === void 0 ? void 0 : _a.items) || [];
    return customFields
        .filter((field) => field.type === 'object')
        .map((field) => ({
        name: field.name,
        value: field.name,
    }));
}
async function getUsers() {
    var _a;
    const response = await this.helpers.httpRequestWithAuthentication.call(this, 'folkApi', {
        method: 'GET',
        url: 'https://api.folk.app/v1/users',
        qs: { limit: 100 },
    });
    const users = ((_a = response.data) === null || _a === void 0 ? void 0 : _a.items) || [];
    return users.map((user) => ({
        name: `${user.fullName} (${user.email})`,
        value: user.id,
    }));
}
//# sourceMappingURL=loadOptions.js.map