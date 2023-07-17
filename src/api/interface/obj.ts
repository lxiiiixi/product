import Request from '../request';

import { ObjectType } from '@/config/commonInterface';

/** ----------------------- interface ----------------------- */
export interface AddObjectData {
    name: string;
    address: string;
    category: ObjectType;
    chain_id: string;
    custom_abi?: string;
}

/** ---------------------- functions ----------------------- */

export function getObjList() {
    return Request({
        method: 'GET',
        url: '/api/obj/list/all'
    });
}

export function addAnObject(newData: AddObjectData) {
    return Request({
        method: 'POST',
        url: '/api/obj',
        data: newData
    });
}
