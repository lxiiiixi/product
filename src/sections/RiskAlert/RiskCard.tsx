import { Card, Space, Button, Dropdown, Row, Col, Tag } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FPCard from '@/components/FPCard';
import { RiskStatus } from '@/config/commonInterface';
import { RiskInfo } from '@/config/commonInterface';
import timestampToDaysAgo from '@/utils/timestampToDaysAgo';

const RiskCard = ({ cardData }: { cardData: RiskInfo }) => {
    const {
        _id,
        name,
        object_id,
        created_at,
        level,
        status,
        labels,
        suspicious_address,
        related_hash,
        assets,
        object_name,
        chain_id,
        object_address,
        strategies,
        category,
        notifications
    } = cardData;

    let backgroundColor = '';
    switch (level) {
        case 'Critical':
            backgroundColor = '#ff909b';
            break;
        case 'High':
            backgroundColor = '#ffde7b';
            break;
        default:
            break;
    }

    return (
        <FPCard
            title={
                <div className="font-normal text-xs flex justify-between items-baseline">
                    <span>
                        <span className="font-semibold text-xl">{name}</span>
                        <span className="mx-1">{level}</span>
                    </span>
                    <li className="list-disc list-inside">
                        {timestampToDaysAgo(created_at)}
                    </li>
                </div>
            }
            className="text-main-textGray h-full"
            headStyle={{ backgroundColor }}
        >
            <div className="text-xs sm:text-sm">
                <Row className="p-2 pr-0 rounded-md bg-indigo-50 font-medium">
                    <Col
                        xs={8}
                        sm={9}
                        md={9}
                        lg={9}
                        className="flex items-center"
                    >
                        <div>Monitored Object</div>
                    </Col>
                    <Col
                        xs={8}
                        sm={9}
                        md={9}
                        lg={9}
                        className="flex items-center"
                    >
                        <div>Emergency Strategies</div>
                    </Col>
                    <Col
                        xs={8}
                        sm={6}
                        md={6}
                        lg={6}
                        className="flex items-center"
                    >
                        <div>Status</div>
                    </Col>
                </Row>
                <Row className="pl-2 py-4">
                    <Col xs={8} sm={9} md={9} lg={9}>
                        <div className="flex justify-between items-center text-xs">
                            <div className="w-4/5">
                                <p className="text-sm mb-0">{object_name}</p>
                                <p className="break-words mt-0">
                                    {object_address}
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col xs={8} sm={9} md={9} lg={9}>
                        <p>
                            {strategies &&
                                strategies.map((item, index) => (
                                    <span key={index + 1}>{item}</span>
                                ))}
                        </p>
                    </Col>
                    <Col xs={8} sm={6} md={6} lg={6}>
                        <p>{status}</p>
                    </Col>
                </Row>
            </div>
            <div className="my-2 text-xs sm:text-sm">
                <Row className="p-2 pr-0 rounded-md bg-indigo-50 font-medium">
                    <Col
                        xs={8}
                        sm={9}
                        md={9}
                        lg={9}
                        className="flex items-center"
                    >
                        <div>Category</div>
                    </Col>
                    <Col
                        xs={8}
                        sm={9}
                        md={9}
                        lg={9}
                        className="flex items-center"
                    >
                        <div>Risk Labels</div>
                    </Col>
                    <Col
                        xs={8}
                        sm={6}
                        md={6}
                        lg={6}
                        className="flex items-center"
                    >
                        <div>Value Of Assets</div>
                    </Col>
                </Row>
                <Row className="pl-2 py-4">
                    <Col xs={8} sm={9} md={9} lg={9}>
                        <p>{category}</p>
                    </Col>
                    <Col xs={8} sm={9} md={9} lg={9}>
                        <Space size={[0, 4]} wrap>
                            {labels &&
                                labels.map((item, index) => (
                                    <Tag color={'warning'} key={index + 1}>
                                        {item}
                                    </Tag>
                                ))}
                        </Space>
                    </Col>
                    <Col xs={8} sm={6} md={6} lg={6}>
                        <p>{assets}</p>
                    </Col>
                </Row>
            </div>
            <div className="text-xs sm:text-sm">
                <Row className="p-2 pr-0 rounded-md bg-indigo-50 font-medium">
                    <Col
                        xs={8}
                        sm={9}
                        md={9}
                        lg={9}
                        className="flex items-center"
                    >
                        <div>Suspicious address</div>
                    </Col>
                    <Col
                        xs={8}
                        sm={9}
                        md={9}
                        lg={9}
                        className="flex items-center"
                    >
                        <div>Related transaction</div>
                    </Col>
                    <Col
                        xs={8}
                        sm={6}
                        md={6}
                        lg={6}
                        className="flex items-center"
                    >
                        <div>Notifications</div>
                    </Col>
                </Row>
                <Row className="pl-2 py-4">
                    <Col xs={8} sm={9} md={9} lg={9} className="flex pr-1">
                        <p className="break-words w-4/5 text-xs">
                            {suspicious_address}
                        </p>
                        <CopyToClipboard
                            text={suspicious_address}
                            onCopy={() => {}}
                        >
                            <span className="text-xs ml-1 cursor-pointer">
                                <CopyOutlined />
                            </span>
                        </CopyToClipboard>
                    </Col>
                    <Col xs={8} sm={9} md={9} lg={9} className="flex pr-1">
                        <p className="break-words w-4/5 text-xs">
                            {related_hash}
                        </p>
                        <CopyToClipboard text={related_hash} onCopy={() => {}}>
                            <span className="text-xs ml-1 cursor-pointer">
                                <CopyOutlined />
                            </span>
                        </CopyToClipboard>
                    </Col>
                    <Col xs={8} sm={6} md={6} lg={6}>
                        <p>
                            {notifications &&
                                notifications.map((item, index) => (
                                    <span key={index + 1}>{item}</span>
                                ))}
                        </p>
                    </Col>
                </Row>
            </div>
            <div className="text-right mt-2">
                {(status === RiskStatus.UnProcessed ||
                    status === RiskStatus.Processed) && (
                    <Button className="mr-2">Ignore</Button>
                )}
                {(status === RiskStatus.UnProcessed ||
                    status === RiskStatus.Ignored) && (
                    <Button type="primary">Execute strategy</Button>
                )}
            </div>
        </FPCard>
    );
};

export default RiskCard;
