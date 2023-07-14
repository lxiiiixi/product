import { Input, InputProps } from 'antd';

function FPInput({ ...props }: InputProps) {
    return (
        <Input className="border-none bg-gray-200 px-2.5 py-1.5" {...props} />
    );
}

export default FPInput;
