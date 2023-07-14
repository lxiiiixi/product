import Request from '../request';

export function getAbi(chain_id: string, address: string) {
    return Request({
        method: 'GET',
        url: `/api/abi/${chain_id}/${address}`
    });
}
