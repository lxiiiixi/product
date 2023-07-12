import React from 'react';

import FPCard from '@/components/FPCard';
import { Space, Switch, Table } from 'antd';

import { TeamOutlined } from '@ant-design/icons';

const functionColumns = [
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
    key: 'created_at'
  }
];

function ObjectTable({ currentObjectList }) {
  const switchObjectStatus = checked => {
    // console.log(checked);
    // if (checked) {
    //   let list = objectList.filter((item) => item.status != "Safe");
    //   setCurrentObjectList(list);
    // } else {
    //   setCurrentObjectList(objectList);
    // }
  };

  return (
    <FPCard
      className="my-3"
      title={
        <p>
          List of Monitored Objects
          <TeamOutlined className="ml-1" style={{ color: '#434A56' }} />
        </p>
      }
      extra={
        <Space align="center">
          <span className="inline-block mx-2">
            All Objects / Threatened Objects
          </span>
          <Switch
            onChange={switchObjectStatus}
            checkedChildren="on"
            unCheckedChildren="off"
          />
        </Space>
      }
    >
      {currentObjectList && (
        <Table
          columns={functionColumns}
          dataSource={currentObjectList}
          scroll={{ x: 1000 }}
          rowKey={record => record._id.$oid}
        />
      )}
    </FPCard>
  );
}

export default ObjectTable;
