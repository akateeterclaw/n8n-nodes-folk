"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDescription = void 0;
const displayOptions = {
    show: {
        resource: ['company'],
        operation: ['delete'],
    },
};
exports.deleteDescription = [
    {
        displayName: 'Company ID',
        name: 'companyId',
        type: 'string',
        default: '',
        required: true,
        displayOptions,
        description: 'The ID of the company to delete',
    },
];
//# sourceMappingURL=delete.operation.js.map