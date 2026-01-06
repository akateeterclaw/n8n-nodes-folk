"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDescription = void 0;
const displayOptions = {
    show: {
        resource: ['note'],
        operation: ['get'],
    },
};
exports.getDescription = [
    {
        displayName: 'Note ID',
        name: 'noteId',
        type: 'string',
        required: true,
        default: '',
        displayOptions,
        description: 'The ID of the note to retrieve',
    },
];
//# sourceMappingURL=get.operation.js.map