import FPBasicModal from '@/components/FPBasicModal';
import { Form, Radio, Space, Button, message } from 'antd';
import useGlobalDataStore from '@/store/globalDaraStore';
import { StrategyModalProps } from '@/pages/ObjectMonitor';
import API from '@/api';

const SelectStrategyModal = ({
    open,
    closeModal,
    strategyModalProps,
    getAndUpdateObjectLists
}: {
    open: boolean;
    closeModal: () => void;
    strategyModalProps: StrategyModalProps;
    getAndUpdateObjectLists: () => void;
}) => {
    const strategyLists = useGlobalDataStore(state => state.strategyLists);
    const strategies = strategyLists.map(item => item.name);
    const { objectId, strategy: oldStrategy } = strategyModalProps;

    const onFinish = (item: { strategy: string }) => {
        console.log([item.strategy]);
        API.ObjApi.updateStrategy(objectId as string, [item.strategy])
            .then(res => {
                closeModal();
                getAndUpdateObjectLists();
            })
            .catch(err => {
                message.error(err.response.data.message);
            });
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
                initialValues={{ strategy: !!oldStrategy ? oldStrategy : '' }}
            >
                <Form.Item name="strategy">
                    <Radio.Group>
                        <Space direction="vertical" size="middle">
                            {strategies.map((item, index) => (
                                <Radio key={index} value={item}>
                                    {item}
                                </Radio>
                            ))}
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
