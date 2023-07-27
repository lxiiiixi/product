import React, { useMemo, useState } from 'react';

import FPCard from '@/components/FPCard';
import { Space, Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { TeamOutlined } from '@ant-design/icons';

import { ObjectInfo } from '@/config/commonInterface';
import timestampToDaysAgo from '@/utils/timestampToDaysAgo';

const functionColumns: ColumnsType<ObjectInfo> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '6%'
    },
    {
        title: 'Blockchain',
        dataIndex: 'chain_id',
        key: 'chain_id',
        width: '6%'
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        width: '15%'
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        width: '6%'
    },
    {
        title: 'FP Monitors',
        dataIndex: 'monitors',
        key: 'monitors',
        width: '8%'
    },
    {
        title: 'Monitoring rules',
        dataIndex: 'rules',
        key: 'rules',
        width: '10%',
        render: (text, record) => {
            return <p>{text ? text.length : ''}</p>;
        }
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status'
    },
    {
        title: 'Activated',
        dataIndex: 'created_at',
        key: 'created_at', // 对象从创建到现在的时间天数
        render: (text, record) => {
            return <p>{timestampToDaysAgo(text).replace(' ago', '')}</p>;
        }
    }
];

function ObjectTable({ objectList }: { objectList: ObjectInfo[] }) {
    const [switchOn, setSwitchOn] = useState(false);

    const filterObject = (list: ObjectInfo[], checked: boolean) => {
        if (checked) {
            return list.filter(item => item.status != 'Safe');
        }
        return list;
    };

    const columnsData = useMemo(
        () => filterObject(objectList, switchOn),
        [objectList, switchOn]
    );

    return (
        <FPCard
            className="my-3"
            title={
                <p>
                    List of Monitored Objects
                    <TeamOutlined
                        className="ml-1"
                        style={{ color: '#434A56' }}
                    />
                </p>
            }
            extra={
                <Space align="center">
                    <span className="inline-block mx-2">
                        All Objects / Threatened Objects
                    </span>
                    <Switch
                        onChange={(checked: boolean) => {
                            setSwitchOn(checked);
                        }}
                        checkedChildren="on"
                        unCheckedChildren="off"
                    />
                </Space>
            }
        >
            <Table
                columns={functionColumns}
                dataSource={columnsData}
                scroll={{ x: 1000 }}
                rowKey={record => record._id.$oid}
            />
        </FPCard>
    );
}

export default ObjectTable;
