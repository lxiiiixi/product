import { useMemo, useState } from 'react';
import { Form, Radio, Select, InputNumber, Space } from 'antd';
import FPInput from '@/components/FPInput';
import FPCard from '@/components/FPCard';
import { DeleteOutlined } from '@ant-design/icons';
import {
    EventsByAbiData,
    getEventsByAbi,
    getPamarsByName
} from '@/utils/abiTransfer';
import { ethers } from 'ethers';
import { RuleInfo } from '@/config/commonInterface';

const EventRuleCard = ({
    ruleIndex,
    ruleValue,
    abi,
    handleDelete,
    handleSetSelector
}: {
    ruleIndex: number;
    ruleValue: RuleInfo;
    abi: string;
    handleDelete: (index: number) => void;
    handleSetSelector: (name: string, value: string) => void;
}) => {
    const [func, setFunc] = useState(ruleValue.name || '');
    const eventByAbi: EventsByAbiData[] = useMemo(
        () => getEventsByAbi(abi),
        [abi]
    );
    const optionalFunctions = useMemo(
        () =>
            eventByAbi.map(item => ({
                key: item.signature,
                value: item.name,
                label: item.name
            })),
        [eventByAbi]
    );

    const dynamicParams = () => {
        const params = getPamarsByName('event', func, abi);
        // 如果碰到同名函数会报错
        return (
            <>
                {params &&
                    params.length > 0 &&
                    params.map((item, index) => {
                        if (item.baseType.includes('int')) {
                            return (
                                <div
                                    className="flex items-center justify-between"
                                    key={index + 1}
                                >
                                    <Form.Item
                                        label={`Param${index + 1}: ${
                                            item.name
                                        }`}
                                        className="w-1/2"
                                    >
                                        <Space>
                                            <span>Min:</span>
                                            <Form.Item
                                                noStyle
                                                name={`rule${ruleIndex}-params${index}-${item.name}-min`}
                                                rules={[{ required: false }]}
                                            >
                                                <InputNumber className="w-full" />
                                            </Form.Item>
                                        </Space>
                                    </Form.Item>
                                    <Form.Item label=" " className="w-1/2">
                                        <Space>
                                            <span>Max:</span>
                                            <Form.Item
                                                noStyle
                                                name={`rule${ruleIndex}-params${index}-${item.name}-max`}
                                                rules={[{ required: false }]}
                                            >
                                                <InputNumber className="w-full" />
                                            </Form.Item>
                                        </Space>
                                    </Form.Item>
                                </div>
                            );
                        } else {
                            switch (item.baseType) {
                                case 'bool':
                                    return (
                                        <Form.Item
                                            name={`rule${ruleIndex}-params${index}-${item.name}`}
                                            label={`Param${index + 1}: ${
                                                item.name
                                            }`}
                                            rules={[{ required: false }]}
                                            key={index + 1}
                                        >
                                            <Radio.Group>
                                                <Radio value="true">
                                                    {' '}
                                                    true{' '}
                                                </Radio>
                                                <Radio value="false">
                                                    {' '}
                                                    false{' '}
                                                </Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    );
                                default:
                                    return (
                                        <Form.Item
                                            name={`rule${ruleIndex}-params${index}-${item.name}`}
                                            label={`Param${index + 1}: ${
                                                item.name
                                            }`}
                                            rules={[{ required: false }]}
                                            key={index + 1}
                                        >
                                            <FPInput
                                                placeholder={`Please enter the parameter for the ${item.baseType} type`}
                                            />
                                        </Form.Item>
                                    );
                            }
                        }
                    })}
            </>
        );
    };

    const handleFunctionChange = (value: string) => {
        setFunc(value);
        const signature = eventByAbi.find(item => item.name === value)
            ?.signature;
        if (signature) {
            const functionSelector = ethers.utils.id(signature);
            handleSetSelector(
                'rule' + ruleIndex + '-selector',
                functionSelector
            );
        }
    };

    return (
        <>
            <div className="p-2 text-main-textGray text-lg font-semibold">
                Event Rule {ruleIndex}
            </div>
            <FPCard>
                <span
                    className="absolute right-5 top-5 cursor-pointer w-6 h-6 flex-center z-50"
                    onClick={() => {
                        handleDelete(ruleIndex);
                    }}
                >
                    <DeleteOutlined />
                </span>
                <Form.Item
                    name={'rule' + ruleIndex + '-level'}
                    label="Risk Level"
                    rules={[{ required: true }]}
                >
                    <Select
                        placeholder="Select Risk"
                        bordered={false}
                        className="bg-gray-200 rounded-md"
                        style={{ padding: '3px 0px' }}
                        options={[
                            { value: 'All', label: 'All' },
                            { value: 'Critical', label: 'Critical' },
                            { value: 'High', label: 'High' },
                            { value: 'Medium', label: 'Medium' },
                            { value: 'Low', label: 'Low' },
                            { value: 'Info', label: 'Info' }
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    name={'rule' + ruleIndex + '-name'}
                    label="Monitor Functions"
                    rules={[{ required: true }]}
                >
                    <Select
                        placeholder="Select Functions"
                        bordered={false}
                        className="bg-gray-200 rounded-md"
                        style={{ padding: '3px 0px' }}
                        options={optionalFunctions}
                        onChange={handleFunctionChange}
                    />
                </Form.Item>
                {dynamicParams()}
                {/* 参数可以不填 只要是检测到这个函数的调用就会报警 */}
                <Form.Item
                    hidden
                    name={'rule' + ruleIndex + '-selector'}
                    label="The selector"
                    rules={[{ required: true }]}
                >
                    <FPInput placeholder="selector" />
                </Form.Item>
            </FPCard>
        </>
    );
};

export default EventRuleCard;
