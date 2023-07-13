// https://chainlist.org/
const chainAndId = [
    {
        chain: 'Ethereum',
        chainId: '1',
        ifTestNet: false
    },
    {
        chain: 'Goerli',
        chainId: '5',
        ifTestNet: true
    },
    {
        chain: 'Polygon',
        chainId: '137',
        ifTestNet: false
    },
    {
        chain: 'Optimism',
        chainId: '10',
        ifTestNet: false
    },
    {
        chain: 'Arbitrum',
        chainId: '42161',
        ifTestNet: false
    }
];

const getChainById = (chainId: string | number) => {
    if (typeof chainId === 'number') chainId = chainId.toString();
    const chain = chainAndId.find(item => item.chainId === chainId);
    return chain ? chain.chain : '';
};

const getIDByChain = (chain: string) => {
    const chainId = chainAndId.find(item => item.chain === chain);
    return chainId ? chainId.chainId : '';
};

export { getChainById, getIDByChain };
