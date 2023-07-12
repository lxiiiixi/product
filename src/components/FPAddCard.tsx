import React from 'react';
import { Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function FPAddCard({ addFunction }: { addFunction: () => void }) {
  return (
    <Card
      style={{ boxShadow: '0 4px 30px #cde1f4' }}
      className="flex-center w-full h-full"
    >
      <div
        className=" w-16 h-16 text-5xl rounded-full bg-indigo-100 flex-center cursor-pointer text-white text-center"
        onClick={addFunction}
      >
        <PlusOutlined />
      </div>
    </Card>
  );
}

export default FPAddCard;
