import type { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
export declare function getGroups(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
export declare function getGroupObjectTypes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
export declare function getUsers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
