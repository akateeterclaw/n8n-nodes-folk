"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descriptions = void 0;
const create_operation_1 = require("./create.operation");
const delete_operation_1 = require("./delete.operation");
const get_operation_1 = require("./get.operation");
const getMany_operation_1 = require("./getMany.operation");
const update_operation_1 = require("./update.operation");
const displayOnlyForCompany = {
    show: {
        resource: ['company'],
    },
};
exports.descriptions = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: displayOnlyForCompany,
        options: [
            {
                name: 'Create',
                value: 'create',
                action: 'Create a company',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/v1/companies',
                    },
                },
            },
            {
                name: 'Delete',
                value: 'delete',
                action: 'Delete a company',
                routing: {
                    request: {
                        method: 'DELETE',
                        url: '=/v1/companies/{{ $parameter.companyId }}',
                    },
                },
            },
            {
                name: 'Get',
                value: 'get',
                action: 'Get a company',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/v1/companies/{{ $parameter.companyId }}',
                    },
                },
            },
            {
                name: 'Get Many',
                value: 'getMany',
                action: 'Get many companies',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/v1/companies',
                    },
                },
            },
            {
                name: 'Update',
                value: 'update',
                action: 'Update a company',
                routing: {
                    request: {
                        method: 'PATCH',
                        url: '=/v1/companies/{{ $parameter.companyId }}',
                    },
                },
            },
        ],
        default: 'getMany',
    },
    ...create_operation_1.createDescription,
    ...delete_operation_1.deleteDescription,
    ...get_operation_1.getDescription,
    ...getMany_operation_1.getManyDescription,
    ...update_operation_1.updateDescription,
];
//# sourceMappingURL=index.js.map