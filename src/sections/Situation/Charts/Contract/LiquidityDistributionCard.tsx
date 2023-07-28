import React from 'react';

import LiquidityPieChart from '@/components/Echarts/LiquidityPieChart';

const LiquidityTableData = [
    {
        key: '1',
        contract: '0x73e02eaab68a41ea63bdae9dbd4b7678827b2352',
        pair: 'UniswapV2 INV-WETH',
        value: 574751,
        time: '2023-02-15 17:44:21.000'
    },
    {
        key: '2',
        contract: '0x328dfd0139e26cb0fef7b0742b49b0fe4325f821',
        pair: 'Sushiswap INV-WETH',
        value: 92150,
        time: '2023-02-14 12:41:26.000'
    },
    {
        key: '3',
        contract: '0x5ba61c0a8c4dcccc200cd0ccc40a5725a426d002',
        pair: 'Sushiswap INV-DOLA',
        value: 43377,
        time: '2023-02-14 17:29:06.000'
    }
];

function LiquidityDistributionCard() {
    const filterLiquidityToPie = arr =>
        arr.map(item => ({ value: item.value, name: item.pair }));

    return (
        <LiquidityPieChart data={filterLiquidityToPie(LiquidityTableData)} />
    );
}

export default LiquidityDistributionCard;
