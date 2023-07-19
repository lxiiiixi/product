import React from 'react';
import FPCard from '@/components/FPCard';
import { Row, Col, Space, Button } from 'antd';
import { getChainById } from '@/utils/chains';
import { shortAddress } from '@/utils/shorterAddress';

function HeaderCard({
    address,
    chain_id,
    name
}: {
    address: string;
    chain_id: string;
    name: string;
}) {
    return (
        <FPCard>
            <Row className="flex items-center">
                <Col
                    xs={16}
                    sm={16}
                    md={16}
                    lg={16}
                    className="flex items-center py-2 sm:p-2"
                >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 mr-3 sm:mr-5 rounded-full bg-red-200"></div>
                    <div>
                        <div className="font-semibold">{name}</div>
                        <div className="text-gray-400 font-light">
                            <span className="text-white bg-indigo-200 mr-1 px-1 rounded leading-5">
                                {getChainById(chain_id)}
                            </span>
                            <span className="sm:hidden">
                                {shortAddress(address)}
                            </span>
                            <span className="hidden sm:inline-block">
                                {address}
                            </span>
                        </div>
                    </div>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8}>
                    <Space className="float-right">
                        <Button type="primary" htmlType="submit">
                            Confirm
                        </Button>
                    </Space>
                </Col>
            </Row>
        </FPCard>
    );
}

export default HeaderCard;
