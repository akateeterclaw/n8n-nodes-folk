import { type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { getGroupCustomFields, getGroups, getGroupObjectTypes, getUsers } from './methods/loadOptions';
export declare class Folk implements INodeType {
    description: INodeTypeDescription;
    methods: {
        loadOptions: {
            getGroupCustomFields: typeof getGroupCustomFields;
            getGroups: typeof getGroups;
            getGroupObjectTypes: typeof getGroupObjectTypes;
            getUsers: typeof getUsers;
        };
    };
}
