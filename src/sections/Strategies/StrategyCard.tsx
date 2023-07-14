
import FPCard from '@/components/FPCard';
import { Button, Row, Col, Tooltip, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { getChainById } from '@/utils/chains';
import { StrategyInfo } from '@/config/commonInterface';

function StrategyCard({
    data,
    handleDeleteStrategy
}: {
    data: StrategyInfo;
    handleDeleteStrategy: (id: string) => void;
}) {
    return (
        <FPCard
            title={data.name}
            headStyle={{ backgroundColor: '#4C68EC', color: '#fff' }}
            className="card-shadow h-full"
            extra={
                <Space wrap>
                    <Button
                        className="bg-white text-main-textGray px-2 rounded-md cursor-pointer"
                        type="primary"
                        onClick={() => {}}
                    >
                        Execute
                    </Button>
                    <Tooltip title="Delete">
                        <Button
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteStrategy(data._id.$oid)}
                        />
                    </Tooltip>
                </Space>
            }
        >
            <Row gutter={20} className="mb-2">
                <Col>
                    <p>Applied Objects</p>
                    <p className="text-2xl">{data.objects}</p>
                </Col>
                <Col>
                    <p>Triggered Count</p>
                    <p className="text-2xl">{data.count}</p>
                </Col>
                <Col>
                    <p>Blockchain</p>
                    <p className="text-2xl">{getChainById(data.chain_id)}</p>
                </Col>
            </Row>
            <p className="mt-3 mb-1">Target Contract address</p>
            <p className="text-gray-500 break-words">{data.address}</p>
            <p className="mt-3">Function to be invoked</p>
            <div className="bg-gray-200 p-2 rounded-lg my-1 break-words">
                {`${data.signature}`}
            </div>
        </FPCard>
    );
}

export default StrategyCard;
