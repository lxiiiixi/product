import { useState } from 'react';
import { Row, Col } from 'antd';
import { FundProjectionScreenOutlined } from '@ant-design/icons';
import FPPageHeader from '@/components/FPPageHeader';
import BubbleContainer from '@/sections/Situation/BubbleContainer';
import UnprocessedRisks from '@/sections/Situation/UnprocessedRisks';
import BasicInfo from '@/sections/LandpageSections/BasicInfo';
import useGlobalDataStore from '@/store/globalDaraStore';
import { ObjectInfo, ObjectType } from '@/config/commonInterface';

import LiquidityDistributionCard from '@/sections/Situation/Charts/Contract/LiquidityDistributionCard';

function Situation() {
    const objectLists = useGlobalDataStore(state => state.objectLists);
    const [focusedObject, setFocusedObject] = useState(objectLists[0]);
    const basicInfo = {
        address: focusedObject.address,
        name: focusedObject.name
    };

    const switchFocusedObject = (id: string) => {
        setFocusedObject(
            objectLists.find(item => item._id.$oid === id) as ObjectInfo
        );
    };

    return (
        <div className="w-full">
            <Row
                align="stretch" // 纵向
                style={{ marginRight: '0px' }}
                className="sm:!-mr-[20px]"
                gutter={[
                    { xs: 0, sm: 20, md: 40, lg: 40 },
                    { xs: 20, sm: 0, md: 20, lg: 30 }
                ]}
            >
                <Col xs={24} sm={16} md={18} lg={18}>
                    <FPPageHeader
                        icon={<FundProjectionScreenOutlined />}
                        text="Select a strategy"
                    />
                    <BubbleContainer
                        data={objectLists}
                        selectedObjId={focusedObject._id.$oid}
                        switchFocusedObject={switchFocusedObject}
                    />
                    <BasicInfo data={basicInfo} />
                    {focusedObject.category === ObjectType.Token && (
                        <div>Token chart</div>
                    )}
                    {focusedObject.category === ObjectType.Contract && (
                        <div>
                            Contract chart
                            <LiquidityDistributionCard />
                        </div>
                    )}
                    {focusedObject.category === ObjectType.EOA && (
                        <div>EOA chart</div>
                    )}
                </Col>
                <Col
                    xs={24}
                    sm={8}
                    md={6}
                    lg={6}
                    className="bg-white rounded-2xl sm:rounded-l-2xl p-4"
                >
                    <UnprocessedRisks />
                </Col>
            </Row>
        </div>
    );
}

export default Situation;
