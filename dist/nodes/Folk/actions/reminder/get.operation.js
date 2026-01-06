"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDescription = void 0;
const displayOptions = {
    show: {
        resource: ['reminder'],
        operation: ['get'],
    },
};
exports.getDescription = [
    {
        displayName: 'Reminder ID',
        name: 'reminderId',
        type: 'string',
        required: true,
        default: '',
        displayOptions,
        description: 'The ID of the reminder to retrieve',
    },
];
//# sourceMappingURL=get.operation.js.map