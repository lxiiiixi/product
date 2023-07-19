import { useState } from 'react';
import { Form, Select, InputNumber, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { RuleInfo } from '@/config/commonInterface';
import FPCard from '@/components/FPCard';

enum RuleOptionsHash {
    '币价监控' = '1',
    '流动性监控' = '2',
    '增发监控' = '3',
    '常销毁监控' = '4'
}

const RuleOptions = Object.keys(RuleOptionsHash).map(key => {
    return {
        key: RuleOptionsHash[key as keyof typeof RuleOptionsHash],
        value: key,
        label: key
    };
});

const TokenCard = ({
    ruleIndex,
    ruleValue,
    handleDelete
}: {
    ruleIndex: number;
    ruleValue: RuleInfo;
    handleDelete: (index: number) => void;
}) => {
    const [rule, setRule] = useState(ruleValue.name || '');

    const dynamicParams = () => {
        switch (rule) {
            case '1':
                return (
                    <>
                        <Form.Item
                            name={`rule${ruleIndex}-params0-间隔时间`}
                            label={`间隔时间`}
                            rules={[{ required: false }]}
                        >
                            <Select
                                placeholder={`请选择间隔时间`}
                                bordered={false}
                                className="bg-gray-200 rounded-md border-none"
                                style={{ padding: '3px 0px' }}
                                options={[
                                    { value: '20min', label: '20min' },
                                    { value: '1hour', label: '1hour' },
                                    { value: '1day', label: '1day' }
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            name={`rule${ruleIndex}-params1-变化幅度`}
                            label={`变化幅度`}
                            rules={[{ required: true }]}
                        >
                            <Select
                                placeholder={`请选择代币变化幅度`}
                                bordered={false}
                                className="bg-gray-200 rounded-md  border-none"
                                style={{ padding: '3px 0px' }}
                                options={[
                                    { value: '20%', label: '20%' },
                                    { value: '50%', label: '50%' },
                                    { value: '80%', label: '80%' }
                                ]}
                            />
                        </Form.Item>
                    </>
                );
            case '2':
                return (
                    <>
                        <Form.Item
                            name={`rule${ruleIndex}-params0-间隔时间`}
                            label={`间隔时间`}
                            rules={[{ required: false }]}
                        >
                            <Select
                                placeholder={`请选择间隔时间`}
                                bordered={false}
                                className="bg-gray-200 rounded-md  border-none"
                                style={{ padding: '3px 0px' }}
                                options={[
                                    { value: '20min', label: '20min' },
                                    { value: '1hour', label: '1hour' },
                                    { value: '1day', label: '1day' }
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            name={`rule${ruleIndex}-params1-变化幅度`}
                            label={`变化幅度`}
                            rules={[{ required: true }]}
                        >
                            <Select
                                placeholder={`请选择代币变化幅度`}
                                bordered={false}
                                className="bg-gray-200 rounded-md  border-none"
                                style={{ padding: '3px 0px' }}
                                options={[
                                    { value: '20%', label: '20%' },
                                    { value: '50%', label: '50%' },
                                    { value: '80%', label: '80%' }
                                ]}
                            />
                        </Form.Item>
                    </>
                );
            case '3':
                return (
                    <Form.Item
                        name={`rule${ruleIndex}-params1-变化幅度`}
                        label={`变化幅度`}
                        rules={[{ required: true }]}
                    >
                        <Select
                            placeholder={`请选择代币变化幅度`}
                            bordered={false}
                            className="bg-gray-200 rounded-md  border-none"
                            style={{ padding: '3px 0px' }}
                            options={[
                                { value: '20%', label: '20%' },
                                { value: '50%', label: '50%' },
                                { value: '80%', label: '80%' }
                            ]}
                        />
                    </Form.Item>
                );
            case '4':
                return (
                    <Form.Item
                        name={`rule${ruleIndex}-params1-变化幅度`}
                        label={`变化幅度`}
                        rules={[{ required: true }]}
                    >
                        <Select
                            placeholder={`请选择代币变化幅度`}
                            bordered={false}
                            className="bg-gray-200 rounded-md  border-none"
                            style={{ padding: '3px 0px' }}
                            options={[
                                { value: '20%', label: '20%' },
                                { value: '50%', label: '50%' },
                                { value: '80%', label: '80%' }
                            ]}
                        />
                    </Form.Item>
                );
        }
    };

    const handleChange = (value: string) => {
        const ruleKey = RuleOptionsHash[value as keyof typeof RuleOptionsHash];
        setRule(ruleKey);
    };

    return (
        <FPCard>
            <span
                className="absolute right-4 top-4 cursor-pointer"
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
                label="Rule Options"
                rules={[{ required: true }]}
            >
                <Select
                    placeholder="Select Rule"
                    bordered={false}
                    className="bg-gray-200 rounded-md"
                    style={{ padding: '3px 0px' }}
                    options={RuleOptions}
                    onChange={handleChange}
                />
            </Form.Item>
            {dynamicParams()}
        </FPCard>
    );
};

export default TokenCard;
