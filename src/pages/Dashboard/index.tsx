import { useMemo } from 'react';
import { Row, Col } from 'antd';

import More from '@/sections/Dashboard/More';
import RiskAlert from '@/sections/Dashboard/RiskAlert';
import ValueDisplay from '@/sections/Dashboard/ValueDisplay';
import RiskTable from '@/sections/Dashboard/RiskTable';
import ObjectTable from '@/sections/Dashboard/ObjectTable';

import useGlobalDataStore from '@/store/globalDaraStore';

import { RiskInfo, RiskStatus } from '@/config/commonInterface';

function Dashboard() {
    const objectList = useGlobalDataStore(state => state.objectLists);
    const riskList = useGlobalDataStore(state => state.riskLists);
    const strategyList = useGlobalDataStore(state => state.strategyLists);

    // console.log(riskListData);
    // console.log('objectList', objectList);

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
        () => getRiskAlertData(riskList),
        [riskList]
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
            <RiskTable riskListData={riskList} />
            <ObjectTable objectList={objectList} />
        </div>
    );
}

export default Dashboard;
