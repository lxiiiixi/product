import { useState, useEffect, useMemo } from 'react';
import { Row, Col } from 'antd';

import API from '@/api';

import More from '@/sections/Dashboard/More';
import RiskAlert from '@/sections/Dashboard/RiskAlert';
import ValueDisplay from '@/sections/Dashboard/ValueDisplay';
import RiskTable from '@/sections/Dashboard/RiskTable';
import ObjectTable from '@/sections/Dashboard/ObjectTable';

import useGlobalDataStore from '@/store/globalDaraStore';

import {
    ObjectInfo,
    RiskInfo,
    RiskStatus,
    StrategyInfo
} from '@/config/commonInterface';

function Dashboard() {
    const [riskListData, setRiskListData] = useState<RiskInfo[]>([]);
    const [objectList, setObjectList] = useState<ObjectInfo[]>([]);
    const [strategyList, setStrategyList] = useState<StrategyInfo[]>([]);

    const storeObjectLists = useGlobalDataStore(
        state => state.storeObjectLists
    );
    const storeRiskLists = useGlobalDataStore(state => state.storeRiskLists);
    const storeStrategyLists = useGlobalDataStore(
        state => state.storeStrategyLists
    );

    // console.log(riskListData);
    // console.log('objectList', objectList);

    const getObjectList = () => {
        API.ObjApi.getObjList()
            .then(res => {
                const objectLists = res.data;
                setObjectList(objectLists);
                storeObjectLists(objectLists);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const getRiskList = () => {
        API.RiskApi.getRiskList()
            .then(res => {
                const riskLists = res.data;
                setRiskListData(riskLists);
                storeRiskLists(riskLists);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const getStrategyList = () => {
        API.StyApi.getStyList()
            .then(res => {
                const strategyList = res.data;
                setStrategyList(strategyList);
                storeStrategyLists(strategyList);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        getObjectList();
        getRiskList();
        getStrategyList();
    }, []);

    const getRiskAlertData = (data: RiskInfo[]) => {
        let dayRiskList: RiskInfo[] = [];
        let threeDayRiskList: RiskInfo[] = [];
        let sevenDayRiskList: RiskInfo[] = [];
        let riskLevel: { [key: string]: number } = {};
        let assetsValue = 0;
        data.forEach(item => {
            if (item.created_at > Date.now() - 86400000) {
                dayRiskList.push(item);
            } else if (item.created_at > Date.now() - 259200000) {
                threeDayRiskList.push(item);
            } else if (item.created_at > Date.now() - 604800000) {
                sevenDayRiskList.push(item);
            }
            if (item.status === RiskStatus.UnProcessed) {
                assetsValue += item.assets;
            }
        });
        // console.log(
        //     'index getRiskAlertData',
        //     dayRiskList,
        //     threeDayRiskList,
        //     sevenDayRiskList
        // );

        dayRiskList.forEach(item => {
            if (riskLevel[item.level]) {
                riskLevel[item.level] += 1;
            } else {
                riskLevel[item.level] = 1;
            }
        });
        threeDayRiskList.forEach(item => {
            if (riskLevel[item.level]) {
                riskLevel[item.level] += 1;
            } else {
                riskLevel[item.level] = 1;
            }
        });
        sevenDayRiskList.forEach(item => {
            if (riskLevel[item.level]) {
                riskLevel[item.level] += 1;
            } else {
                riskLevel[item.level] = 1;
            }
        });
        return { riskLevel, assetsValue };
    };

    const { riskLevel, assetsValue } = useMemo(
        () => getRiskAlertData(riskListData),
        [riskListData]
    );

    return (
        <div>
            <More />
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} align="stretch">
                <Col xs={24} sm={24} md={12} lg={10} className="my-3">
                    <RiskAlert riskLevel={riskLevel} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={14} className="my-3">
                    <ValueDisplay
                        assetsValue={assetsValue}
                        strategyCount={strategyList.length}
                    />
                </Col>
            </Row>
            <RiskTable riskListData={riskListData} />
            <ObjectTable objectList={objectList} />
        </div>
    );
}

export default Dashboard;
