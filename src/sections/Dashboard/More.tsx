import React from 'react';
import { SoundFilled } from '@ant-design/icons';

function More() {
  return (
    <div className="p-2 flex justify-between items-center">
      <div>
        <SoundFilled className="text-main-textGray" />
        <span className="text-main-textGray mx-1">
          7 *24 real-time professional service is ready
        </span>
      </div>
      <a className=" px-3 py-1 bg-white text-xs rounded-lg shadow">See More</a>
    </div>
  );
}

export default More;
