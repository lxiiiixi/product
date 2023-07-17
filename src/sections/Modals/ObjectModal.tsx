import {
    Form,
    Space,
    Button,
    Input,
    Select,
    Checkbox,
    Row,
    Col,
    message
} from 'antd';
import {
    InfoCircleOutlined,
    MessageOutlined,
    PhoneOutlined,
    MailOutlined,
    SlackOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import FPBasicModal from '@/components/FPBasicModal';
import FPInput from '@/components/FPInput';

import { ObjectModalProps } from '@/pages/ObjectMonitor';
import { PictureCard } from '@/assets';
import { AddObjectData } from '@/api/interface/obj';
import API from '@/api';

const blockchainOption = [
    { value: '1', label: 'Ethereum', chainId: '1' },
    { value: '137', label: 'Polygon', chainId: '137' },
    { value: '10', label: 'Optimism', chainId: '10' },
    { value: '42161', label: 'Arbitrum One', chainId: '42161' }
];

const plainOptions = [
    {
        label: (
            <span>
                <span className="text-xs text-gray-500">
                    <MessageOutlined />
                </span>
                Message
            </span>
        ),
        value: 'Message'
    },
    {
        label: (
            <span>
                <span className="text-xs text-gray-500">
                    <PhoneOutlined />
                </span>
                Phone
            </span>
        ),
        value: 'Phone'
    },
    {
        label: (
            <span>
                <span className="text-xs text-gray-500">
                    <MailOutlined />
                </span>
                Email
            </span>
        ),
        value: 'Email'
    },
    {
        label: (
            <span>
                <span className="text-xs text-gray-500">
                    <SlackOutlined />
                </span>
                Slack
            </span>
        ),
        value: 'Slack'
    }
];

const ObjectModal = ({
    open,
    closeModal,
    modalProps,
    getAndUpdateObjectLists
}: {
    open: boolean;
    closeModal: () => void;
    modalProps: ObjectModalProps;
    getAndUpdateObjectLists: () => void;
}) => {
    const [form] = Form.useForm();
    const { optType, objectType, editObjectData } = modalProps;

    const onFinish = (item: AddObjectData) => {
        console.log(item);
        if (objectType === null) return;

        const custom_abi = item.custom_abi || null; // "[]"
        const addObj: AddObjectData = {
            category: objectType,
            address: item.address,
            chain_id: item.chain_id,
            name: item.name
        };
        console.log(custom_abi, addObj);
        if (optType === 'Add') {
            const addObject = (addData: AddObjectData) => {
                console.log(addData);
                API.ObjApi.addAnObject(addData)
                    .then(res => {
                        console.log(res);
                        message.success(`Add ${item.name} successfully`);
                        closeModal();
                        getAndUpdateObjectLists();
                    })
                    .catch(err => {
                        message.error(err.response.data.message);
                    });
            };
            // abi 是可选项，但是这个对象添加成功的前提是我们的abi数据表中存了证地址的默认abi（开源/自定义都可以只要存在）
            // Contract 类型的对象才需要 abi
            if (objectType === 'Contract' && !custom_abi) {
                // 如果用户没有输入 abi，就去查数据库，如果数据库也没有，就提示用户输入 abi
                API.AbiApi.getAbi(item.chain_id, item.address)
                    .then(res => {
                        console.log(res);
                        addObject(addObj);
                    })
                    .catch(err => {
                        console.log(err);
                        message.warning('Please input the abi manually');
                    });
            } else {
                const submitdata = { ...addObj };
                if (custom_abi) submitdata.custom_abi = custom_abi;
                addObject(submitdata);
            }
        } else if (optType === 'Edit') {
            // edit obj info
        }
    };

    // "Record chain:1,address:0x1111111254EEB25477B68fb85Ed929f73A960582 does not exist or you have no permission"
    // Waiting: 这里找的是etherscan上一个开源的合约，但是为什么这里显示找不到，需要找后端确认

    // abi 这个自动默认以用户自定义为主，如果用户没有自定义，就用数据库存的默认的开源abi
    const setAbi = async () => {
        const address = form.getFieldValue('address');
        const chain_id = form.getFieldValue('chain_id');
        if (address && chain_id) {
            API.AbiApi.getAbi(chain_id, address)
                .then(res => {
                    if (res.status === 200) {
                        const abi = res.data.abi;
                        form.setFieldsValue({ custom_abi: abi });
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

    return (
        <FPBasicModal
            title={`${optType} A Monitor Object`}
            open={open}
            closeModal={closeModal}
            width={800}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                name="object-form"
                initialValues={editObjectData ? editObjectData : { name: '' }}
            >
                <h3 className="text-main-textGray">Basic Info</h3>
                <div className="flex justify-between my-4">
                    <div>
                        <div>Category</div>
                        <p className="mt-2 font-light">{objectType}</p>
                    </div>
                    <img alt="logo" src={PictureCard} width={80} height={80} />
                </div>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true }]}
                >
                    {optType === 'Add' ? (
                        <FPInput placeholder="Please input the name of object" />
                    ) : (
                        <FPInput
                            disabled
                            placeholder="Please input the name of object"
                        />
                    )}
                </Form.Item>
                <Form.Item
                    name="chain_id"
                    label="Blockchain"
                    rules={[{ required: true }]}
                >
                    {optType === 'Add' ? (
                        <Select
                            placeholder="Select the blockchain"
                            bordered={false}
                            className="bg-gray-200 rounded-md"
                            options={blockchainOption}
                        />
                    ) : (
                        <Select
                            disabled
                            placeholder="Select the blockchain"
                            bordered={false}
                            className="bg-gray-200 rounded-md"
                            style={{ padding: '3px 0px' }}
                            options={blockchainOption}
                        />
                    )}
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Object's Address"
                    rules={[{ required: true }]}
                >
                    <FPInput placeholder="Please input the Object's Address" />
                </Form.Item>
                {objectType === 'Contract' && (
                    <>
                        <h3 className="text-main-textGray">
                            ABI
                            <span className="font-light text-sm ml-1">
                                <InfoCircleOutlined />
                            </span>
                        </h3>
                        <div className="px-6 py-4 rounded-xl bg-gradient-to-l from-[#434a56] to-[#1d2127]">
                            <div className="flex justify-between text-white pb-2">
                                <div>
                                    <span className="text-gray-400 mr-2">
                                        <CheckCircleOutlined />
                                    </span>
                                    Checking passed.
                                </div>
                                <Button size="small" onClick={setAbi}>
                                    Get
                                </Button>
                            </div>
                            <Form.Item
                                name="custom_abi"
                                rules={[{ required: false }]}
                            >
                                <Input.TextArea
                                    rows={4}
                                    className="bg-gray-200"
                                />
                            </Form.Item>
                        </div>
                    </>
                )}
                <h3 className="text-main-textGray">Notifications</h3>
                <Form.Item name="channel" initialValue="Email">
                    <Checkbox.Group style={{ width: '100%' }} disabled={true}>
                        <Row gutter={[0, 18]} style={{ width: '100%' }}>
                            {plainOptions.map(item => (
                                <Col
                                    key={item.value}
                                    xs={12}
                                    sm={12}
                                    md={6}
                                    lg={6}
                                >
                                    <Checkbox value={item.value}>
                                        {item.label}
                                    </Checkbox>
                                </Col>
                            ))}
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
                <h3 className="text-main-textGray">
                    FP Monitors
                    <span className=" font-light text-sm ml-1">
                        <InfoCircleOutlined />
                    </span>
                </h3>
                <Form.Item name="monitors">
                    <div className="flex justify-start flex-wrap">
                        {objectType === 'Contract' && (
                            <div className="mr-3 my-2 px-5 py-2 border border-solid border-gray-400 rounded-xl cursor-pointer">
                                Flash-loans detection
                            </div>
                        )}
                        <div className="mr-3 my-2 px-5 py-2 rounded-xl bg-gray-200 cursor-pointer">
                            Regular Attacks detection
                        </div>
                        <div className="mr-3 my-2 px-5 py-2 border border-solid border-gray-400 rounded-xl cursor-pointer">
                            Abnormal Transactions Models
                        </div>
                        <div className="mr-3 my-2 px-5 py-2 border border-solid border-gray-400 rounded-xl cursor-pointer">
                            Rug-pull detection
                        </div>
                    </div>
                </Form.Item>
                <Form.Item className="mt-2 w-full flex-center">
                    <Space size="middle">
                        <Button onClick={closeModal}>Cancel</Button>
                        <Button type="primary" htmlType="submit">
                            Confirm
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </FPBasicModal>
    );
};

export default ObjectModal;
