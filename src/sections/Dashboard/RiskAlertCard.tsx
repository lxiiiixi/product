import { useState } from 'react';
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
    riskLevel: {
        [key in '1d' | '3d' | '7d']: { [key: string]: number };
    };
}

function RiskAlertCard({ riskLevel }: RiskAlertProps) {
    const [time, setTime] = useState<'1d' | '3d' | '7d'>('1d');

    const handleChange = (value: string) => {
        setTime(value as '1d' | '3d' | '7d');
    };

    // waiting: 风险应该有五个 需要确认一下并确认对应的颜色
    const getBgColor = (item: 'High' | 'Medium' | 'Low') => {
        switch (item) {
            case 'High':
                return 'bg-red-400';
            case 'Medium':
                return 'bg-amber-400';
            case 'Low':
                return 'bg-gray-300';
            default:
                return 'bg-object-contract';
        }
    };

    return (
        <FPCard
            title="Risk Alert"
            headStyle={{ color: '#626262', border: 'none' }}
            bodyStyle={{ height: '84%' }}
            className="h-full bg-[#f3f8fe] risk-alert-bg"
            extra={<FPRadio options={options} handleChange={handleChange} />}
        >
            <div className="h-full w-[58%] flex justify-around items-end">
                {riskLevel[time] &&
                    Object.keys(riskLevel[time]).map((item, index) => {
                        return (
                            <div className="w-[30%]" key={index}>
                                <p className="text-xl my-1 font-semibold text-center">
                                    {riskLevel[time][item]}
                                </p>
                                <div
                                    className={`${getBgColor(
                                        item as 'High' | 'Medium' | 'Low'
                                    )}  rounded-lg text-center flex justify-center items-end text-white`}
                                    style={{
                                        height: `${
                                            riskLevel[time][item] * 80
                                        }px`
                                    }}
                                    // waiting: 当前这里的高度只是暂定乘积，如果数量太多会超
                                >
                                    <span>{item ? item : ''}</span>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </FPCard>
    );
}

export default RiskAlertCard;
