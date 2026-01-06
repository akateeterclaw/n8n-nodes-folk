"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDescription = void 0;
const displayOptions = {
    show: {
        resource: ['reminder'],
        operation: ['delete'],
    },
};
exports.deleteDescription = [
    {
        displayName: 'Reminder ID',
        name: 'reminderId',
        type: 'string',
        required: true,
        default: '',
        displayOptions,
        description: 'The ID of the reminder to delete',
    },
];
//# sourceMappingURL=delete.operation.js.map