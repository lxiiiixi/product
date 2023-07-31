import { Card, Row, Col, Table } from 'antd';

import LiquidityPieChart from '@/components/Echarts/LiquidityPieChart';

interface LiquidityTableData {
    key: string;
    contract: string;
    pair: string;
    value: number;
    time: string;
}

const LiquidityTableData: LiquidityTableData[] = [
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

const liquidityTableColumns = [
    {
        title: 'Contract',
        dataIndex: 'contract',
        width: '25%',
        align: 'left',
        render: (text: string) => (
            <div className="w-32 text-ellipsis overflow-hidden whitespace-nowrap hover:bg-white hover:shadow-lg hover:whitespace-normal hover:p-1">
                {text}
            </div>
        )
    },
    {
        title: 'Pair',
        dataIndex: 'pair',
        align: 'left',
        width: '27%',
        render: (text: string) => (
            <div className=" w-32 text-ellipsis overflow-hidden whitespace-nowrap hover:bg-white hover:shadow-lg hover:whitespace-normal hover:p-1">
                {text}
            </div>
        )
    },
    {
        title: 'Liquidity Value($)',
        dataIndex: 'value',
        align: 'left',
        width: '16%',
        sorter: (a: LiquidityTableData, b: LiquidityTableData) => {
            return Number(a.value) - Number(b.value);
        }
    },
    {
        title: 'Update Time',
        dataIndex: 'time',
        align: 'left',
        width: '25%',
        render: (text: string) => (
            <div className=" w-32 text-ellipsis overflow-hidden whitespace-nowrap hover:bg-white hover:shadow-lg hover:whitespace-normal hover:p-1">
                {text}
            </div>
        ),
        sorter: (a: LiquidityTableData, b: LiquidityTableData) =>
            new Date(a.time).getTime() - new Date(b.time).getTime()
    }
];

function LiquidityDistributionTable() {
    const filterLiquidityToPie = (arr: LiquidityTableData[]) =>
        arr.map(item => ({ value: item.value, name: item.pair }));

    return (
        // <LiquidityPieChart data={filterLiquidityToPie(LiquidityTableData)} />
        <Card
            className="my-4"
            title="Liquidity Distribution"
            headStyle={{ backgroundColor: '#4C68EC', color: '#fff' }}
        >
            <Row gutter={20}>
                <Col xs={24} sm={24} md={8} lg={8}>
                    {LiquidityTableData && (
                        <LiquidityPieChart
                            data={filterLiquidityToPie(LiquidityTableData)}
                        />
                    )}
                </Col>
                <Col xs={24} sm={24} md={16} lg={16}>
                    <Table
                        bordered={false}
                        columns={liquidityTableColumns}
                        dataSource={LiquidityTableData}
                        scroll={{
                            y: 220,
                            x: 600
                        }}
                        pagination={false}
                        size="small"
                    />
                </Col>
            </Row>
        </Card>
    );
}

export default LiquidityDistributionTable;
