import React from 'react';
import { Link } from 'react-router-dom';

import FPCard from '@/components/FPCard';
import { Table, Button, Tag } from 'antd';
import { AlertFilled } from '@ant-design/icons';
import { useModal } from '@/hooks/useModal';
import ContactUsFormModal from '@/sections/Modals/ContactUsModal';
import type { ColumnsType } from 'antd/es/table';
import { RiskInfo } from '@/config/commonInterface';

import { getChainById } from '@/utils/chains';

const tableColumns: ColumnsType<RiskInfo> = [
    {
        title: 'Discovery time',
        dataIndex: 'created_at', // Waiting: 时间转换为 xxx days ago
        key: 'created_at',
        width: '10%'
    },
    {
        title: 'Risk Labels',
        dataIndex: 'name',
        key: 'name',
        width: '12%',
        render: (data, record) => (
            // console.log(data),
            <>
                <p className="my-1">{data}</p>
                <p className="my-1">
                    <Tag color="volcano">{record.level}</Tag>
                </p>
                {record.labels.map(item => {
                    return (
                        <p className="my-1" key={item}>
                            <Tag color="warning">{item}</Tag>
                        </p>
                    );
                })}
            </>
        )
    },
    {
        title: 'Level',
        dataIndex: 'level',
        key: 'level',
        width: '6%',
        render: item => {
            if (item === 'High') {
                return (
                    <p>
                        <span className="dots-10 high-color mr-1"></span>High
                    </p>
                );
            } else if (item === 'Critical') {
                return (
                    <p>
                        <span className="dots-10 bg-red-500 mr-1"></span>
                        Critical
                    </p>
                );
            }
        }
    },
    {
        title: 'Monitored Object',
        dataIndex: 'object_address',
        key: 'object_address',
        width: '28%',
        render: (text, record) => (
            <div className="whitespace-normal">
                {`${record.name} (${getChainById(
                    record.chain_id as string
                )}:${text})`}
            </div>
        )
    },
    {
        title: 'Value of Assets involved',
        dataIndex: 'assets',
        key: 'assets',
        width: '8%'
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: '10%'
    },
    {
        title: () => {
            return 'Emergency strategies';
        },
        dataIndex: 'strategies',
        key: 'strategies',
        width: '8%',
        render: (text, record) => {
            return text
                ? text.map((item: string[]) => {
                      <p>{item}</p>;
                  })
                : '';
        }
    },
    {
        title: 'More',
        dataIndex: 'suggestion',
        key: 'more',
        render: (text, record) => {
            return (
                // Waiting: 风险详情页面的跳转
                <Link to={`../risk/${record._id.$oid}`}>
                    <Button className="blue-title-bg" type="primary">
                        View Detail
                    </Button>
                </Link>
            );
        }
    }
];

function RiskTable({ riskListData }: { riskListData: RiskInfo[] }) {
    const { open, openModal, closeModal } = useModal();
    return (
        <FPCard
            className="card-shadow mb-3"
            title={
                <p>
                    Real-time Risk Monitoring
                    <AlertFilled className="text-red-500 ml-1" />
                </p>
            }
            extra={
                <>
                    <span className="inline-block mx-2">
                        7 x 24 Professional Service
                    </span>
                    <Button
                        className="blue-title-bg"
                        type="primary"
                        onClick={openModal}
                    >
                        Enable
                    </Button>
                </>
            }
        >
            {[] && (
                <Table
                    columns={tableColumns}
                    dataSource={riskListData}
                    scroll={{ x: 1000 }}
                    rowKey={record => record._id.$oid}
                />
            )}
            <ContactUsFormModal open={open} closeModal={closeModal} />
        </FPCard>
    );
}

export default RiskTable;
