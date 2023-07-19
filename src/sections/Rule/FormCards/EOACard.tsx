import { useState } from 'react';
import { Form, Select, InputNumber, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { RuleInfo } from '@/config/commonInterface';
import FPCard from '@/components/FPCard';
import FPInput from '@/components/FPInput';

enum RuleOptionsHash {
    'ETH 转移监控' = '1',
    '授权EOA' = '2',
    '代币转账号监测' = '3',
    'NFT转移监测' = '4'
}

const RuleOptions = Object.keys(RuleOptionsHash).map(key => {
    return {
        key: RuleOptionsHash[key as keyof typeof RuleOptionsHash],
        value: key,
        label: key
    };
});

const EOACard = ({
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
                            name={`rule${ruleIndex}-params0-转移目标`}
                            label={`转移目标`}
                            rules={[{ required: false }]}
                        >
                            <FPInput placeholder={`请输入代币转移目标`} />
                        </Form.Item>
                        <Form.Item
                            name={`rule${ruleIndex}-params1-转移额度`}
                            label={`转移额度`}
                            rules={[{ required: true }]}
                        >
                            <FPInput placeholder={`请输入代币转移额度`} />
                        </Form.Item>
                    </>
                );
            case '2':
                return null;
            case '3':
                return (
                    <>
                        <Form.Item
                            name={`rule${ruleIndex}-params0-代币地址`}
                            label={`代币地址`}
                            rules={[{ required: true }]}
                        >
                            <FPInput placeholder={`请输入代币代币地址`} />
                        </Form.Item>
                        <Form.Item
                            name={`rule${ruleIndex}-params1-转移目标`}
                            label={`转移目标`}
                            rules={[{ required: false }]}
                        >
                            <FPInput placeholder={`请输入代币转移目标`} />
                        </Form.Item>
                        <Form.Item
                            name={`rule${ruleIndex}-params2-转移额度`}
                            label={`转移额度`}
                            rules={[{ required: true }]}
                        >
                            <FPInput placeholder={`请输入代币转移额度`} />
                        </Form.Item>
                    </>
                );
            case '4':
                return (
                    <>
                        <Form.Item
                            name={`rule${ruleIndex}-params0-NFT地址`}
                            label={`NFT地址`}
                            rules={[{ required: true }]}
                        >
                            <FPInput placeholder={`请输入代币NFT地址`} />
                        </Form.Item>
                        <Form.Item
                            name={`rule${ruleIndex}-params1-转移目标`}
                            label={`转移目标`}
                            rules={[{ required: false }]}
                        >
                            <FPInput placeholder={`请输入代币转移目标`} />
                        </Form.Item>
                        <Form.Item
                            name={`rule${ruleIndex}-params2-tokenId`}
                            label={`tokenId`}
                            rules={[{ required: true }]}
                        >
                            <FPInput placeholder={`请输入代币tokenId`} />
                        </Form.Item>
                    </>
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

export default EOACard;
