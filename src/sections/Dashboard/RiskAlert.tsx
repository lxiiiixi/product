import { useState } from 'react';

import { Card, Radio, Row, Col } from 'antd';
import FPCard from '@/components/FPCard';
import FPRadio from '@/components/FPRadio';

const options = [
    {
        key: '1',
        label: '24h',
        value: '1d'
        // time: 86400000
    },
    {
        key: '2',
        label: '3d',
        value: '3d'
        // time: 259200000
    },
    {
        key: '3',
        label: '7d',
        value: '7d'
        // time: 604800000
    }
];

interface RiskAlertProps {
    riskLevel: { [key: string]: number };
}

function RiskAlert({ riskLevel }: RiskAlertProps) {
    return (
        <FPCard
            title="Risk Alert"
            headStyle={{ color: '#626262', border: 'none' }}
            className="h-full bg-[#f3f8fe]"
            extra={<FPRadio options={options} />}
        >
            <Row className="flex items-end">
                {riskLevel &&
                    Object.keys(riskLevel).map((item, index) => {
                        return (
                            <Col span={6} className="text-center" key={index}>
                                <p className="text-xl my-1 font-semibold text-center w-9/12">
                                    {riskLevel[item]}
                                </p>
                                <div
                                    className="rounded-lg text-center flex justify-center items-end w-9/12"
                                    style={{
                                        height: `${riskLevel[item] * 10}px`
                                    }}
                                >
                                    <span>{item ? item : ''}</span>
                                </div>
                            </Col>
                        );
                    })}
            </Row>
        </FPCard>
    );
}

export default RiskAlert;
