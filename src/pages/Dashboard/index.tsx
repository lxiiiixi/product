import { useState, useEffect } from 'react';
import { Card, message, Row, Col } from 'antd';

import API from '@/api';

import More from '@/sections/Dashboard/More';
import RiskAlert from '@/sections/Dashboard/RiskAlert';
import ValueDisplay from '@/sections/Dashboard/ValueDisplay';
import RiskTable from '@/sections/Dashboard/RiskTable';
import ObjectTable from '@/sections/Dashboard/ObjectTable';

// import userInfoStore from "@/store/userInfoStore";

import { ObjectInfo, StrategyInfo } from '@/config/commonInterface';

function Dashboard() {
    const [riskListData, setRiskListData] = useState<StrategyInfo[]>([]);
    const [currentObjectList, setCurrentObjectList] = useState<ObjectInfo[]>(
        []
    );

    console.log(riskListData);

    const getObjectList = () => {
        API.ObjApi.getObjList()
            .then(res => {
                setRiskListData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const getRiskList = () => {
        API.RiskApi.getRiskList()
            .then(res => {
                setCurrentObjectList(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        getObjectList();
        getRiskList();
    }, []);

    // const getStrategyList = () => {
    //   API.StyApi.getStyList()
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // };

    return (
        <div>
            <More />
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} align="stretch">
                <Col xs={24} sm={24} md={12} lg={10} className="my-3">
                    <RiskAlert />
                </Col>
                <Col xs={24} sm={24} md={12} lg={14} className="my-3">
                    <ValueDisplay />
                </Col>
            </Row>
            <RiskTable riskListData={riskListData} />
            <ObjectTable currentObjectList={currentObjectList} />
        </div>
    );
}

export default Dashboard;
