import { type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { getGroups, getGroupObjectTypes, getUsers } from './methods/loadOptions';
export declare class Folk implements INodeType {
    description: INodeTypeDescription;
    methods: {
        loadOptions: {
            getGroups: typeof getGroups;
            getGroupObjectTypes: typeof getGroupObjectTypes;
            getUsers: typeof getUsers;
        };
    };
}
