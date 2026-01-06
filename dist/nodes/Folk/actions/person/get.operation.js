"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDescription = void 0;
const displayOptions = {
    show: {
        resource: ['person'],
        operation: ['get'],
    },
};
exports.getDescription = [
    {
        displayName: 'Person ID',
        name: 'personId',
        type: 'string',
        default: '',
        required: true,
        displayOptions,
        description: 'The ID of the person to retrieve',
    },
];
//# sourceMappingURL=get.operation.js.map