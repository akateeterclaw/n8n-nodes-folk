"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDescription = void 0;
const displayOptions = {
    show: {
        resource: ['person'],
        operation: ['delete'],
    },
};
exports.deleteDescription = [
    {
        displayName: 'Person ID',
        name: 'personId',
        type: 'string',
        default: '',
        required: true,
        displayOptions,
        description: 'The ID of the person to delete',
    },
];
//# sourceMappingURL=delete.operation.js.map