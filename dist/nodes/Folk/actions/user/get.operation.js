"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDescription = void 0;
const displayOptions = {
    show: {
        resource: ['user'],
        operation: ['get'],
    },
};
exports.getDescription = [
    {
        displayName: 'User ID',
        name: 'userId',
        type: 'string',
        required: true,
        default: '',
        displayOptions,
        description: 'The ID of the user to retrieve',
    },
];
//# sourceMappingURL=get.operation.js.map