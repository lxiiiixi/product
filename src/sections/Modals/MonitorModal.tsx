import FPBasicModal from '@/components/FPBasicModal';
import { Form, Checkbox, Space, Button } from 'antd';

const MonitorModal = ({
    open,
    closeModal
}: {
    open: boolean;
    closeModal: () => void;
}) => {
    const onFinish = (item: { name: string }) => {
        closeModal();
    };

    return (
        <FPBasicModal
            title="Add Customized Monitor Rule"
            open={open}
            closeModal={closeModal}
            footer={null}
        >
            <Form onFinish={onFinish}>
                <Form.Item name="monitor">
                    <Checkbox.Group>
                        <Space direction="vertical" size="middle">
                            <Checkbox value={1}>Flash-loans detection</Checkbox>
                            <Checkbox value={2}>
                                Regular Attacks detection
                            </Checkbox>
                            <Checkbox value={3}>Rug-pull detection</Checkbox>
                            <Checkbox value={4}>
                                Abnormal Transactions Models
                            </Checkbox>
                        </Space>
                    </Checkbox.Group>
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

export default MonitorModal;
