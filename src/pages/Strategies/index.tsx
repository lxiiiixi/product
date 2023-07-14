import { useEffect, useState } from 'react';
import { PlusOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Row, Col, message } from 'antd';

import FPPageHeader from '@/components/FPPageHeader';
import FPCard from '@/components/FPCard';

import ContactCard from '@/sections/Strategies/ContactCard';
import StrategyCard from '@/sections/Strategies/StrategyCard';
import StrategyModal, {
    StrategyModalDataProps
} from '@/sections/Modals/StrategyModal';

import { useModal } from '@/hooks/useModal';
import API from '@/api';

import { StrategyInfo } from '@/config/commonInterface';

function Strategies() {
    const { open, openModal, closeModal } = useModal();
    const [strategyList, setStrategyList] = useState<StrategyInfo[]>([]);
    const [modalProps, setModalProps] = useState<StrategyModalDataProps>({
        opt: 'add',
        state: {}
    });

    const getStrategyList = () => {
        API.StyApi.getStyList()
            .then(res => {
                setStrategyList(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        getStrategyList();
    }, []);

    const handleDeleteStrategy = (id: string) => {
        API.StyApi.deleteASty(id)
            .then(res => {
                if (res.status === 200) {
                    message.success('Delete successfully');
                    getStrategyList();
                }
            })
            .catch(err => {
                message.error(err.response.data.message);
            });
    };

    const handleAddStrategy = () => {
        openModal();
        // setModalProps(...modalProps)
    };

    return (
        <div>
            <StrategyModal
                open={open}
                closeModal={closeModal}
                data={modalProps}
            />
            <FPPageHeader
                icon={<FieldTimeOutlined />}
                text="Select a strategy"
            />
            <ContactCard />
            <div
                className="rounded-2xl p-2 my-3 flex-center cursor-pointer bg-main-violet/25"
                onClick={handleAddStrategy}
            >
                <PlusOutlined className="text-white text-xl font-extrabold" />
            </div>
            <Row gutter={[24, 24]} className="items-stretch">
                {strategyList.length &&
                    strategyList.map(item => {
                        return (
                            <Col
                                xs={24}
                                sm={12}
                                md={12}
                                lg={12}
                                key={item._id.$oid}
                            >
                                <StrategyCard
                                    data={item}
                                    handleDeleteStrategy={handleDeleteStrategy}
                                />
                            </Col>
                        );
                    })}
            </Row>
        </div>
    );
}

export default Strategies;
