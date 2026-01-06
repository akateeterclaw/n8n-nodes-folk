"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDescription = void 0;
const displayOptions = {
    show: {
        resource: ['note'],
        operation: ['delete'],
    },
};
exports.deleteDescription = [
    {
        displayName: 'Note ID',
        name: 'noteId',
        type: 'string',
        required: true,
        default: '',
        displayOptions,
        description: 'The ID of the note to delete',
    },
];
//# sourceMappingURL=delete.operation.js.map