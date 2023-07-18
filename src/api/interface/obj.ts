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

export function updateStrategy(id: string, newStrategy: string[]) {
    return Request({
        method: 'PUT',
        url: `/api/obj/strategy/${id}`,
        data: { value: newStrategy }
    });
}

export function deleteAnObject(id: string) {
    return Request({
        method: 'DELETE',
        url: `/api/obj/${id}`
    });
}
