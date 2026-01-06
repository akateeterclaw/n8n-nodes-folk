"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDescription = void 0;
const displayOptions = {
    show: {
        resource: ['company'],
        operation: ['get'],
    },
};
exports.getDescription = [
    {
        displayName: 'Company ID',
        name: 'companyId',
        type: 'string',
        default: '',
        required: true,
        displayOptions,
        description: 'The ID of the company to retrieve',
    },
];
//# sourceMappingURL=get.operation.js.map