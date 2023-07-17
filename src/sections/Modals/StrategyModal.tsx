import { useMemo, useState } from 'react';
import { Form, Input, Select, Radio, Button, message } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

import FPBasicModal from '@/components/FPBasicModal';
import FPInput from '@/components/FPInput';

import API from '@/api';
import supportedChain from '@/config/supportedChain';
import { getFuntionsByAbi } from '@/utils/abiTransfer';
import { CreateAStyData } from '@/api/interface/sty';

// waiting: 新增还是编辑（目前记得编辑的地方好像就是执行策略的时候 暂时未知）

export interface StrategyModalDataProps {
    opt: 'add' | 'edit';
    state: {};
}

export interface StrategyModalForm extends CreateAStyData {
    [key: string]: string | undefined;
    // 一个索引签名，允许使用字符串类型的索引来访问对象的属性
}

function StrategyModal({
    open,
    closeModal,
    data
}: {
    open: boolean;
    closeModal: () => void;
    data: StrategyModalDataProps;
}) {
    const [form] = Form.useForm();
    const [choosedFunction, setChoosedFunction] = useState(1);
    const [customAbi, setCustomAbi] = useState('');
    const [customFunctionSignature, setCustomFunctionSignature] =
        useState<string>();

    // const [strategyDefaultData, setStrategyDefaultData] = useState({});
    // const [abiParams, setAbiParams] = useState({
    //     chianId: supportedChain[0].chainId,
    //     contractAddress: ''
    // });

    const handleConfirm = () => {
        const submitData = form.getFieldsValue();
        let data: StrategyModalForm = {
            address: '',
            chain_id: '',
            custom_abi: '',
            name: '',
            params: '',
            signature: ''
        };
        let params: { [key: string]: string } = {};
        for (let index in submitData) {
            if (index.includes('param')) {
                // waiting: 这里还有可能会产生的一个bug，我这里获取参数并不是按照顺序获取的，但是后端接受的时候就是按照参数顺序解析而不是参数名称，如果我提交的时候不区分一下是不是会可能出现参数传递和对应错误
                const [paramIndex, paramName] = index.split('-');
                params[paramIndex] = submitData[index];
            } else {
                // waiting: 这个项目中两个地方对于 abi 的处理目前感觉不是很清晰，之后要像一个更完美的方式
                data[index] = submitData[index];
            }
        }
        data.params = JSON.stringify(params);

        API.StyApi.createASty(data)
            .then(res => {
                console.log(res);
                message.success('Success!');
                closeModal();
            })
            .catch(err => {
                console.log(err);
            });
    };

    const getFuntionByAbi = () => {
        // waiting: 这里暂时有个warning，因为方法会在组件首次渲染时执行一次，但这时候 form 还没有和组件绑定，这里等之后看是否需要编辑之后看需不需要加上默认值来进一步确认和判断
        const abi = form.getFieldValue('custom_abi');
        if (abi)
            return getFuntionsByAbi(abi).filter(
                item => item.stateMutability !== ('view' || 'pure')
            );
        return [];
    };
    const functionList = useMemo(() => getFuntionByAbi(), [customAbi]);

    const getAndSetAbi = () => {
        const address = form.getFieldValue('address');
        const chainId = form.getFieldValue('chain_id');
        if (address && chainId) {
            API.AbiApi.getAbi(chainId, address)
                .then(res => {
                    if (res.status === 200) {
                        const abi = res.data.abi;
                        form.setFieldsValue({ custom_abi: abi });
                        setCustomAbi(abi);
                    } else {
                        message.warning(
                            'Abi doesn‘t exsit, please input the abi manually'
                        );
                    }
                })
                .catch(err => {
                    message.open({
                        type: 'warning',
                        content: err.response.data.message
                    });
                });
        } else {
            message.warning(
                'Please input the address and chain of the object first'
            );
        }
    };

    const getFuntionName = (choosedFunction: number) => {
        switch (choosedFunction) {
            case 1:
                return (
                    <div>
                        <Form.Item
                            name="function"
                            label="Function Name"
                            rules={[{ required: false }]}
                        >
                            <p className="mb-2">pause</p>
                        </Form.Item>
                        <Form.Item
                            name="function"
                            label="Parameter list"
                            rules={[{ required: false }]}
                        >
                            <div className="flex my-1">
                                <span className="inline-block px-3 py-1 bg-gray-200 rounded-l-xl">
                                    newOwner
                                </span>
                                <Input
                                    bordered={false}
                                    placeholder="Input the corresponding value"
                                />
                            </div>
                        </Form.Item>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <Form.Item
                            name="function"
                            label="Function Name"
                            rules={[{ required: false }]}
                        >
                            <p className="mb-2">Transfer ownership</p>
                        </Form.Item>
                        <Form.Item
                            name="function"
                            label="Parameter list"
                            rules={[{ required: false }]}
                        >
                            <div className="flex my-1">
                                <span className="inline-block px-3 py-1 bg-gray-200 rounded-l-xl">
                                    newOwner
                                </span>
                                <Input
                                    bordered={false}
                                    placeholder="Input the corresponding value"
                                />
                            </div>
                        </Form.Item>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <Form.Item
                            name="signature"
                            label="Function Name"
                            rules={[{ required: false }]}
                        >
                            <Select
                                onChange={value => {
                                    setCustomFunctionSignature(value);
                                }}
                                options={functionList.map(item => ({
                                    label: item.name,
                                    value: item.signature
                                }))}
                            />
                        </Form.Item>
                        <p>Parameter list</p>
                        {functionList
                            .find(
                                item =>
                                    item.signature === customFunctionSignature
                            )
                            ?.inputs.map((item, index) => {
                                return (
                                    <Form.Item
                                        key={index}
                                        name={
                                            'param' +
                                                index.toString() +
                                                '-' +
                                                item.name || ''
                                        } // waiting 存在没有函数的参数没有name的情况怎么办
                                        style={{ marginBottom: 0 }}
                                        rules={[{ required: false }]}
                                    >
                                        <div className="flex my-1" key={index}>
                                            <span className="inline-block px-3 py-1 bg-gray-200 rounded-l-xl">
                                                {item.name}
                                            </span>
                                            <Input
                                                bordered={false}
                                                placeholder="Input the corresponding value"
                                            />
                                        </div>
                                    </Form.Item>
                                );
                            })}
                    </div>
                );
        }
    };

    return (
        <FPBasicModal
            open={open}
            closeModal={closeModal}
            title="Create Emergency Strategy"
            width={800}
            footer={
                <div className="flex-center pb-5">
                    <Button key="back" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button key="submit" type="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </div>
            }
        >
            <Form
                form={form}
                layout="vertical"
                name="addObj"
                // initialValues={strategyDefaultData}
            >
                <Form.Item
                    name="name"
                    label="Strategy Name"
                    rules={[{ required: false }]}
                >
                    <FPInput placeholder="Please input strategy Name" />
                </Form.Item>
                <Form.Item
                    name="chain_id"
                    label="Blockchain"
                    rules={[{ required: false }]}
                >
                    <Select
                        placeholder="Select blockchain"
                        bordered={false}
                        className="bg-gray-200 rounded-md"
                        // onChange={value => {
                        //     setAbiParams(state => ({
                        //         ...state,
                        //         chianId: value
                        //     }));
                        // }}
                        options={supportedChain.map(item => ({
                            label: item.chainName,
                            value: item.chainId
                        }))}
                    />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Target Contract"
                    rules={[{ required: false }]}
                >
                    <FPInput
                        // onChange={e => {
                        //     setAbiParams(state => ({
                        //         ...state,
                        //         contractAddress: e.target.value
                        //     }));
                        // }}
                        placeholder="Input target contract"
                    />
                </Form.Item>
                <div>
                    <p className="mb-2"> ABI </p>
                    <div className="px-6 py-4 rounded-xl bg-gradient-to-l from-[#434a56] to-[#1d2127]">
                        <div className="flex justify-between text-white pb-2">
                            <span>
                                <CheckCircleOutlined className="text-gray-400 mr-2" />
                                Checking passed.
                            </span>
                            <Button size="small" onClick={getAndSetAbi}>
                                Get
                            </Button>
                        </div>
                        <Form.Item
                            name="custom_abi"
                            label=""
                            rules={[{ required: false }]}
                        >
                            <Input.TextArea
                                rows={6}
                                className="bg-gray-200"
                                onChange={e => {
                                    const vlaue = e.target.value;
                                    setCustomAbi(vlaue);
                                }}
                                // value={abiData}
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="mt-8">
                    <p className="my-4"> Choose Function </p>
                    <Radio.Group
                        // name="choosedFunction"
                        defaultValue={choosedFunction}
                        onChange={e => {
                            const value = e.target.value;
                            setChoosedFunction(value);
                            if (
                                value === 3 &&
                                !form.getFieldValue('custom_abi')
                            ) {
                                message.warning(
                                    'Please get or input a custom abi first'
                                );
                            }
                        }}
                    >
                        <Radio value={1}>Contract pause</Radio>
                        <Radio value={2}>Transfer ownership</Radio>
                        <Radio value={3}>Customilzed Call</Radio>
                    </Radio.Group>
                </div>
                <div className="mt-8">
                    <p className="my-4"> Function Name </p>
                    {getFuntionName(choosedFunction)}
                </div>
            </Form>
        </FPBasicModal>
    );
}

export default StrategyModal;
