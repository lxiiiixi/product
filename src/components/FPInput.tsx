import { Input, InputProps } from 'antd';

function FPInput({ ...props }: InputProps) {
  return <Input className="border-none bg-gray-200 p-1.5" {...props} />;
}

export default FPInput;
