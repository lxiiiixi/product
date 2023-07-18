import FPBasicModal from '@/components/FPBasicModal';
import { Form, Radio, Space, Button } from 'antd';
// import Api from '@/utils/api';

const SelectStrategyModal = ({
    open,
    closeModal
}: {
    open: boolean;
    closeModal: () => void;
}) => {
    // console.log(strategies);
    const onFinish = (item: { strategy: string }) => {
        console.log(item);
        // Api.put("/api/obj/strategy/" + objId, { value: [item.strategy] }).then(res => {
        //     // console.log(res);
        //     closeModal(true)
        // }).catch(err => {
        //     // console.log(err);
        //     messageApi.open({
        //         type: 'warning',
        //         content: err.response.data.message,
        //     });
        //     closeModal()
        // })
    };

    return (
        <FPBasicModal
            title="Edit Emergency Strategy"
            open={open}
            closeModal={closeModal}
            footer={null}
        >
            <Form
                onFinish={onFinish}
                // initialValues={{ strategy: !!strategies ? strategies[0] : '' }}
            >
                <Form.Item name="strategy">
                    <Radio.Group>
                        <Space direction="vertical" size="middle">
                            {/* 全局数据获取 */}

                            {/* {allStrategies.map((item, index) => (
                                <Radio key={index} value={item}>
                                    {item}
                                </Radio>
                            ))} */}
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item className=" w-full flex justify-center items-center">
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

export default SelectStrategyModal;
