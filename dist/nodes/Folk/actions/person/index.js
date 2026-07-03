"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descriptions = void 0;
const addToGroups_operation_1 = require("./addToGroups.operation");
const create_operation_1 = require("./create.operation");
const delete_operation_1 = require("./delete.operation");
const get_operation_1 = require("./get.operation");
const getMany_operation_1 = require("./getMany.operation");
const removeFromGroup_operation_1 = require("./removeFromGroup.operation");
const search_operation_1 = require("./search.operation");
const updateCustomFields_operation_1 = require("./updateCustomFields.operation");
const update_operation_1 = require("./update.operation");
const displayOnlyForPerson = {
    show: {
        resource: ['person'],
    },
};
exports.descriptions = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: displayOnlyForPerson,
        options: [
            {
                name: 'Add to Groups',
                value: 'addToGroups',
                action: 'Add a person to groups',
                routing: {
                    request: {
                        method: 'PATCH',
                        url: '=/v1/people/{{ $parameter.personId }}',
                    },
                },
            },
            {
                name: 'Create',
                value: 'create',
                action: 'Create a person',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/v1/people',
                    },
                },
            },
            {
                name: 'Delete',
                value: 'delete',
                action: 'Delete a person',
                routing: {
                    request: {
                        method: 'DELETE',
                        url: '=/v1/people/{{ $parameter.personId }}',
                    },
                },
            },
            {
                name: 'Get',
                value: 'get',
                action: 'Get a person',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/v1/people/{{ $parameter.personId }}',
                    },
                },
            },
            {
                name: 'Get Many',
                value: 'getMany',
                action: 'Get many people',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/v1/people',
                    },
                },
            },
            {
                name: 'Remove From Group',
                value: 'removeFromGroup',
                action: 'Remove a person from a group',
                routing: {
                    request: {
                        method: 'PATCH',
                        url: '=/v1/people/{{ $parameter.personId }}',
                    },
                },
            },
            {
                name: 'Search',
                value: 'search',
                action: 'Search people',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/v1/people',
                    },
                },
            },
            {
                name: 'Update',
                value: 'update',
                action: 'Update a person',
                routing: {
                    request: {
                        method: 'PATCH',
                        url: '=/v1/people/{{ $parameter.personId }}',
                    },
                },
            },
            {
                name: 'Update Custom Fields',
                value: 'updateCustomFields',
                action: 'Update person custom fields',
                routing: {
                    request: {
                        method: 'PATCH',
                        url: '=/v1/people/{{ $parameter.personId }}',
                    },
                },
            },
        ],
        default: 'getMany',
    },
    ...addToGroups_operation_1.addToGroupsDescription,
    ...create_operation_1.createDescription,
    ...delete_operation_1.deleteDescription,
    ...get_operation_1.getDescription,
    ...getMany_operation_1.getManyDescription,
    ...removeFromGroup_operation_1.removeFromGroupDescription,
    ...search_operation_1.searchDescription,
    ...updateCustomFields_operation_1.updateCustomFieldsDescription,
    ...update_operation_1.updateDescription,
];
//# sourceMappingURL=index.js.map
