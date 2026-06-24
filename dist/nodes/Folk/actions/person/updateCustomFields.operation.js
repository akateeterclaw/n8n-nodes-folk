"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomFieldsDescription = void 0;
const displayOptions = {
    show: {
        resource: ['person'],
        operation: ['updateCustomFields'],
    },
};
async function mergeCustomFieldValues(requestOptions) {
    var _a, _b, _c, _d, _e;
    const personId = this.getNodeParameter('personId');
    const groupId = this.getNodeParameter('groupId');
    const customFieldUpdates = this.getNodeParameter('customFieldUpdates');
    const response = (await this.helpers.httpRequestWithAuthentication.call(this, 'folkApi', {
        method: 'GET',
        url: `https://api.folk.app/v1/people/${personId}`,
    }));
    const existingCustomFieldValues = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.customFieldValues) !== null && _b !== void 0 ? _b : {};
    const existingGroupValues = ((_c = existingCustomFieldValues[groupId]) !== null && _c !== void 0 ? _c : {});
    const updatedGroupValues = { ...existingGroupValues };
    for (const field of (_d = customFieldUpdates.fieldValues) !== null && _d !== void 0 ? _d : []) {
        if (field.fieldName) {
            updatedGroupValues[field.fieldName] = field.value;
        }
    }
    const body = ((_e = requestOptions.body) !== null && _e !== void 0 ? _e : {});
    body.customFieldValues = {
        ...existingCustomFieldValues,
        [groupId]: updatedGroupValues,
    };
    requestOptions.body = body;
    return requestOptions;
}
exports.updateCustomFieldsDescription = [
    {
        displayName: 'Person ID',
        name: 'personId',
        type: 'string',
        default: '',
        required: true,
        displayOptions,
        description: 'The ID of the person whose custom fields to update',
    },
    {
        displayName: 'Group Name or ID',
        name: 'groupId',
        type: 'options',
        required: true,
        default: '',
        displayOptions,
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
            loadOptionsMethod: 'getGroups',
        },
    },
    {
        displayName: 'Custom Fields',
        name: 'customFieldUpdates',
        type: 'fixedCollection',
        typeOptions: {
            multipleValues: true,
        },
        default: {},
        required: true,
        displayOptions,
        description: 'Select custom fields from the group and provide their new values',
        options: [
            {
                displayName: 'Custom Field',
                name: 'fieldValues',
                values: [
                    {
                        displayName: 'Custom Field Name or ID',
                        name: 'fieldName',
                        type: 'options',
                        required: true,
                        default: '',
                        typeOptions: {
                            loadOptionsMethod: 'getGroupCustomFields',
                            loadOptionsDependsOn: ['groupId'],
                        },
                        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                    },
                    {
                        displayName: 'Value',
                        name: 'value',
                        type: 'string',
                        default: '',
                        description: 'The value to set. Supports expressions for dates, numbers, booleans, lists, and objects.',
                    },
                ],
            },
        ],
        routing: {
            send: {
                type: 'body',
                property: 'customFieldValues',
                preSend: [mergeCustomFieldValues],
            },
        },
    },
];
//# sourceMappingURL=updateCustomFields.operation.js.map
