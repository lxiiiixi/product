import { Tag } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import FPCard from '@/components/FPCard';
import { RiskInfo } from '@/config/commonInterface';
import timestampToDaysAgo from '@/utils/timestampToDaysAgo';

function RiskCard({ data }: { data: RiskInfo }) {
    const { created_at, level, name, assets } = data;
    return (
        <FPCard
            bodyStyle={{ padding: '16px' }}
            className="relative my-6 rounded-xl h-[160px]"
        >
            <div className="flex justify-between items-center">
                <div className=" text-gray-500">
                    {timestampToDaysAgo(created_at)}
                </div>
                <Tag className="rounded-xl" color="red">
                    {level}
                </Tag>
            </div>
            <p className="my-1">
                {name} {'  '}
                <span className=" whitespace-nowrap font-bold text-lg leading-8">
                    $ {assets}
                </span>
            </p>
            <p>From FP Monitors</p>
            <div className="absolute right-4 bottom-2 text-gray-500">
                Detail
                <span className="text-xs">
                    <ArrowRightOutlined />
                </span>
            </div>
        </FPCard>
    );
}

export default RiskCard;
