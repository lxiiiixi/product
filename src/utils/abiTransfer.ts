import { ethers } from 'ethers';

export interface FunctionsByAbiData {
    signature: string;
    constant: boolean;
    outputs?: ethers.utils.ParamType[] | undefined;
    stateMutability: string;
    payable: boolean;
    gas?: ethers.BigNumber | undefined;
    type: string;
    name: string;
    inputs: ethers.utils.ParamType[];
    _isFragment: boolean;
}

export interface EventsByAbiData {
    signature: string;
    anonymous: boolean;
    type: string;
    name: string;
    inputs: ethers.utils.ParamType[];
    _isFragment: boolean;
}

const getAbiInterface = (abi: string) => {
    if (typeof abi === 'string') abi = JSON.parse(abi);
    if (abi && abi.length === 0) return null;
    const iface = new ethers.utils.Interface(abi);
    return iface;
};

/**
 * @description: Get all functions by abi
 * @param {abi} abi
 * @return {Array} functions which include all data of function
 * @comment 当前拿到的是所有function的数据，如果需要进一步的筛选，在需要的地方拿到所有的数据后筛选。
 */
const getFuntionsByAbi = (abi: string): FunctionsByAbiData[] | [] => {
    const iface = getAbiInterface(abi);
    if (!iface) return [];
    const functions = iface.functions;
    const functionsArray = Object.keys(functions || {}).map(key => {
        const signature = key;
        return {
            ...functions[key],
            signature
        };
    });
    return functionsArray;
};

/**
 * @description: Get all functions by abi
 * @param {abi} abi
 * @return {Array} functions which include all data of function
 */
const getEventsByAbi = (abi: string): EventsByAbiData[] | [] => {
    const iface = getAbiInterface(abi);
    if (!iface) return [];
    const events = iface.events;
    const eventsArray = Object.keys(events).map(key => {
        const signature = key;
        return {
            ...events[key],
            signature
        };
    });
    return eventsArray;
};

/**
 * @description: Get parameters by abi and a function or event name
 * @param {string} type  "function"/"event"
 * @param {string} name  function/event name
 * @param {abi} abi  abi
 * @return {array} params
 */
const getPamarsByName = (
    type: 'function' | 'event',
    name: string,
    abi: string
) => {
    if (type !== 'function' && type !== 'event')
        throw new Error('Please enter the correct type');
    const iface = getAbiInterface(abi);
    if (!iface) return [];
    try {
        // 如何查找的函数/方法不存在会报错 no matching function
        if (type === 'event') return iface.getEvent(name)?.inputs || [];
        if (type === 'function') return iface.getFunction(name)?.inputs || [];
    } catch {
        return [];
    }
};

export { getAbiInterface, getFuntionsByAbi, getEventsByAbi, getPamarsByName };
