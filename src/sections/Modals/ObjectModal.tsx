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

import { ObjectModalProps } from '@/pages/ObjectMonitor';

export interface ObjectFormData {}

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
                </span>{' '}
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
                </span>{' '}
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
                </span>{' '}
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
                </span>{' '}
                Slack
            </span>
        ),
        value: 'Slack'
    }
];

const ObjectModal = ({
    open,
    closeModal,
    modalProps
}: {
    open: boolean;
    closeModal: () => void;
    modalProps: ObjectModalProps;
}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const { TextArea } = Input;

    const { optType, objectType, editObjectData } = modalProps;
    console.log(optType, objectType, editObjectData);

    const onFinish = item => {
        // const custom_abi = item.custom_abi || null // "[]"
        // const addObj = {
        //     category: objectType,
        //     address: item.address,
        //     chain_id: item.chain_id,
        //     name: item.name
        // }
        // console.log(custom_abi, addObj);
        // if (optType === "Add") {
        //     const addObject = (addData) => {
        //         console.log(addData);
        //         Api.post('/api/obj', addData).then(res => {
        //             console.log(res);
        //             closeModal(true)
        //             messageApi.open({
        //                 type: 'success',
        //                 content: "Add successfully",
        //             });
        //         }).catch(err => {
        //             closeModal()
        //             messageApi.open({
        //                 type: 'warning',
        //                 content: err.response.data.message,
        //             });
        //         })
        //     }
        //     // abi 是可选项，但是这个对象添加成功的前提是我们的abi数据表中存了证地址的默认abi（开源/自定义都可以只要存在）
        //     if (objectType === "Contract" && !custom_abi) {
        //         // 如果用户没有输入 abi，就去查数据库，如果数据库也没有，就提示用户输入 abi
        //         Api.get(`/api/abi/1/${item.address}`).then((res) => {
        //             addObject(addObj)
        //         }).catch(err => {
        //             messageApi.open({
        //                 type: 'warning',
        //                 content: 'Please input the abi manually',
        //             });
        //         })
        //     } else {
        //         // 如果用户输入了abi，就直接添加
        //         addObject({ ...addObj, custom_abi })
        //     }
        // } else if (optType === "Edit") {
        //     // edit obj info
        // }
    };

    // abi 这个自动默认以用户自定义为主，如果用户没有自定义，就用数据库存的默认的开源abi
    const setAbi = async () => {
        const address = form.getFieldValue('address');
        // if (address) {
        //     // 使用 chainId
        //     Api.get(`/api/abi/1/${address}`).then(res => {
        //         // console.log(res);
        //         form.setFieldsValue({ custom_abi: res.abi })
        //     }).catch(err => {
        //         // console.log(err);
        //         messageApi.open({
        //             type: 'warning',
        //             content: 'Abi doesn‘t exsit, please input the abi manually',
        //         });
        //     })
        // } else {
        //     messageApi.open({
        //         type: 'warning',
        //         content: 'Please input the address of object first',
        //     });
        // }
    };

    return (
        <FPBasicModal
            title={`${optType} A Monitor Object`}
            open={open}
            closeModal={closeModal}
            width={800}
            footer={null}
        >
            {contextHolder}
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                name="addObj"
                initialValues={editObjectData}
            >
                <h3 className="text-textGary">Basic Info</h3>
                <div className="flex justify-between my-2">
                    <div>
                        <div>Category</div>
                        <p className="mt-2 font-light">{objectType}</p>
                    </div>
                    <img
                        alt="logo"
                        src="/static/picture-card.png"
                        width={80}
                        height={80}
                    />
                </div>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true }]}
                >
                    {optType === 'Add' ? (
                        <Input
                            placeholder="Please input the name of object"
                            className=" border-none bg-gray-200 p-1 pl-2"
                        />
                    ) : (
                        <Input
                            disabled
                            placeholder="Please input the name of object"
                            className=" border-none bg-gray-200 p-1 pl-2"
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
                            style={{ padding: '3px 0px' }}
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
                    <Input
                        placeholder="Please input the Object's Address"
                        className=" border-none bg-gray-200 p-1 pl-2"
                    />
                </Form.Item>
                {objectType === 'Contract' && (
                    <>
                        <h3 className="text-textGary">
                            ABI{' '}
                            <span className=" font-light text-sm ml-1">
                                <InfoCircleOutlined />
                            </span>{' '}
                        </h3>
                        <div className="px-5 py-2 rounded-xl black-linear-gradient-270">
                            <div className="flex justify-between text-white pb-2">
                                <div>
                                    <span className="text-gray-400 mr-2">
                                        <CheckCircleOutlined />
                                    </span>{' '}
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
                                <TextArea rows={4} className=" bg-gray-200" />
                            </Form.Item>
                        </div>
                    </>
                )}
                <h3 className="text-textGary">Notifications</h3>
                <Form.Item name="channel" initialValue="Email">
                    {/* <Checkbox.Group options={plainOptions} /> */}
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
                <h3 className="text-textGary">
                    FP Monitors{' '}
                    <span className=" font-light text-sm ml-1">
                        <InfoCircleOutlined />
                    </span>{' '}
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
                <Form.Item className="mt-2 w-full flex justify-center items-center">
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
