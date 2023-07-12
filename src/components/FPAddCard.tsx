import React from 'react';
import { Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function FPAddCard({ addFunction }: { addFunction: () => void }) {
  return (
    <Card className="flex-center w-full h-full shadow">
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
