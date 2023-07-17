import Request from '../request';

/** ----------------------- interface ----------------------- */
export interface CreateAStyData {
    address: string;
    chain_id: string;
    custom_abi?: string;
    name: string;
    params: string;
    signature: string;
}

/** ---------------------- functions ----------------------- */
export function getStyList() {
    return Request({
        method: 'GET',
        url: '/api/sty/list/all'
    });
}

export function createASty(addData: CreateAStyData) {
    return Request({
        method: 'POST',
        url: '/api/sty',
        data: addData
    });
}

export function getStyById(id: string) {
    return Request({
        method: 'GET',
        url: `/api/sty/${id}`
    });
}

// 用户删除一个策略,删除之前必须解绑定相应的对象,下一步自动解绑
export function deleteASty(id: string) {
    return Request({
        method: 'DELETE',
        url: `/api/sty/${id}`
    });
}
