import React from 'react';
import { Space } from 'antd';

interface OptionType {
  key: string;
  value: string;
  label: string;
}

interface FPRadioProps {
  options: OptionType[];
  handleChange?: (value: string) => void;
}

function FPRadio({ options, handleChange }: FPRadioProps) {
  const [checkedItem, setCheckedItem] = React.useState(options[0].value);
  const handleClick = (value: string) => {
    setCheckedItem(value);
    if (handleChange) handleChange(value);
  };

  return (
    <Space size={10} className="w-auto h-auto flex">
      {options.map(item => {
        return (
          <div
            key={item.key}
            className={`text-white w-[50px] h-[30px] bg-main-violet flex-center text-xs rounded-md ${
              checkedItem !== item.value ? 'opacity-60' : ''
            }  cursor-pointer`}
            onClick={() => {
              handleClick(item.value);
            }}
          >
            {item.label}
          </div>
        );
      })}
    </Space>
  );
}

export default FPRadio;
