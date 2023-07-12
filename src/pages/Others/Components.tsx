import React from 'react';

import FPCard from '@/components/FPCard';
import FPAddCard from '@/components/FPAddCard';
import FPPageHeader from '@/components/FPPageHeader';
import FPInput from '@/components/FPInput';
import FPRadio from '@/components/FPRadio';

import { PlusOutlined } from '@ant-design/icons';

function Components() {
  return (
    <div className="p-6 pb-[300px]">
      <div className="my-4">
        theme color
        <div className="flex">
          <div className="h-8 w-8 rounded-lg m-2 flex-center bg-main-blue">
            1
          </div>
          <div className="h-8 w-8 rounded-lg m-2 flex-center bg-main-violet">
            2
          </div>
          <div className="h-8 w-8 rounded-lg m-2 flex-center bg-levelColor-warning">
            3
          </div>
          <div className="h-8 w-8 rounded-lg m-2 flex-center bg-levelColor-danger">
            4
          </div>
          <div className="h-8 w-8 rounded-lg m-2 flex-center bg-levelColor-safe">
            5
          </div>
          <div className="h-8 w-8 rounded-lg m-2 flex-center bg-object-token">
            6
          </div>
          <div className="h-8 w-8 rounded-lg m-2 flex-center bg-object-contract">
            7
          </div>
          <div className="h-8 w-8 rounded-lg m-2 flex-center bg-object-eoa">
            8
          </div>
          <div className="h-8 w-8 rounded-lg m-2 flex-center bg-main-textGray">
            9
          </div>
        </div>
      </div>
      <div className="my-4">
        FPCard
        <FPCard
          title="Card title"
          headerBgColor="#60d2a8"
          extra={<a href="#">More</a>}
        >
          content
        </FPCard>
      </div>
      <div className="my-4 w-[260px] h-[260px]">
        FPAddCard
        <FPAddCard addFunction={() => {}} />
      </div>
      <div className="my-4">
        FPPageHeader
        <FPPageHeader icon={<PlusOutlined />} text="test" />
      </div>
      <div className="my-4">
        FPInput
        <FPInput />
      </div>
      <div className="my-4">
        FPRadio
        <FPRadio
          handleChange={value => {
            console.log(value);
          }}
          options={[
            {
              key: '1',
              label: '24h',
              value: '1d'
            },
            {
              key: '2',
              label: '3d',
              value: '3d'
            },
            {
              key: '3',
              label: '7d',
              value: '7d'
            }
          ]}
        />
      </div>
    </div>
  );
}

export default Components;
