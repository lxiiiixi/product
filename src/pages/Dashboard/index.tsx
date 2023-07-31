import { useMemo } from 'react';
import { Row, Col } from 'antd';

import More from '@/sections/Dashboard/More';
import RiskAlertCard from '@/sections/Dashboard/RiskAlertCard';
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

    const demodata = [
        {
            _id: {
                $oid: '644238284823dbaf3d9e0f7e'
            },
            name: 'CustomRisk',
            object_id: '644234d9fb5338d47790b95c',
            user_id: '643e4edb9de01054273fa8e8',
            created_at: 1690100812019,
            level: 'High',
            status: 'UnProcessed',
            labels: ['Emit mint'],
            suspicious_address: '0x888888888dac1d551df1bdaad5f2575884888808',
            related_hash:
                '0x59673cf5ecd28e65720928eaf9160278e9232eb29aca0cb7a3797cc53040b90b',
            assets: 1000
        },
        {
            _id: {
                $oid: '644238284223dbaf3d9e0f7e'
            },
            name: 'CustomRisk',
            object_id: '644234d9fb5338d47790b95c',
            user_id: '643e4edb9de01054273fa8e8',
            created_at: 1690100812019,
            level: 'Low',
            status: 'UnProcessed',
            labels: ['Emit mint'],
            suspicious_address: '0x888888888dac1d551df1bdaad5f2575884888808',
            related_hash:
                '0x59673cf5ecd28e65720928eaf9160278e9232eb29aca0cb7a3797cc53040b90b',
            assets: 1000
        },
        {
            _id: {
                $oid: '64423828422dbaf3d9e0f7e'
            },
            name: 'CustomRisk',
            object_id: '644234d9fb5338d47790b95c',
            user_id: '643e4edb9de01054273fa8e8',
            created_at: 1690100812019,
            level: 'Medium',
            status: 'UnProcessed',
            labels: ['Emit mint'],
            suspicious_address: '0x888888888dac1d551df1bdaad5f2575884888808',
            related_hash:
                '0x59673cf5ecd28e65720928eaf9160278e9232eb29aca0cb7a3797cc53040b90b',
            assets: 1000
        },
        {
            _id: {
                $oid: '6442388422dbaf3d9e0f7e'
            },
            name: 'CustomRisk',
            object_id: '644234d9fb5338d47790b95c',
            user_id: '643e4edb9de01054273fa8e8',
            created_at: 1689928114819,
            level: 'High',
            status: 'UnProcessed',
            labels: ['Emit mint'],
            suspicious_address: '0x888888888dac1d551df1bdaad5f2575884888808',
            related_hash:
                '0x59673cf5ecd28e65720928eaf9160278e9232eb29aca0cb7a3797cc53040b90b',
            assets: 1000
        },
        {
            _id: {
                $oid: '6442382822dbaf3d9e0f7e'
            },
            name: 'CustomRisk',
            object_id: '644234d9fb5338d47790b95c',
            user_id: '643e4edb9de01054273fa8e8',
            created_at: 1689928114819,
            level: 'Medium',
            status: 'UnProcessed',
            labels: ['Emit mint'],
            suspicious_address: '0x888888888dac1d551df1bdaad5f2575884888808',
            related_hash:
                '0x59673cf5ecd28e65720928eaf9160278e9232eb29aca0cb7a3797cc53040b90b',
            assets: 1000
        },
        {
            _id: {
                $oid: '64423828422dbaf3d9e07e'
            },
            name: 'CustomRisk',
            object_id: '644234d9fb5338d47790b95c',
            user_id: '643e4edb9de01054273fa8e8',
            created_at: 1689582543279,
            level: 'Medium',
            status: 'UnProcessed',
            labels: ['Emit mint'],
            suspicious_address: '0x888888888dac1d551df1bdaad5f2575884888808',
            related_hash:
                '0x59673cf5ecd28e65720928eaf9160278e9232eb29aca0cb7a3797cc53040b90b',
            assets: 1000
        },
        {
            _id: {
                $oid: '4423828422dbaf3d9e0f7e'
            },
            name: 'CustomRisk',
            object_id: '644234d9fb5338d47790b95c',
            user_id: '643e4edb9de01054273fa8e8',
            created_at: 1689582543279,
            level: 'Medium',
            status: 'UnProcessed',
            labels: ['Emit mint'],
            suspicious_address: '0x888888888dac1d551df1bdaad5f2575884888808',
            related_hash:
                '0x59673cf5ecd28e65720928eaf9160278e9232eb29aca0cb7a3797cc53040b90b',
            assets: 1000
        },
        {
            _id: {
                $oid: '64423828422daf3d9e07e'
            },
            name: 'CustomRisk',
            object_id: '644234d9fb5338d47790b95c',
            user_id: '643e4edb9de01054273fa8e8',
            created_at: 1690100012019,
            level: 'Medium',
            status: 'UnProcessed',
            labels: ['Emit mint'],
            suspicious_address: '0x888888888dac1d551df1bdaad5f2575884888808',
            related_hash:
                '0x59673cf5ecd28e65720928eaf9160278e9232eb29aca0cb7a3797cc53040b90b',
            assets: 1000
        }
    ];
    const getRiskAlertData = (data: RiskInfo[]) => {
        let oneDayRiskList: RiskInfo[] = [];
        let threeDayRiskList: RiskInfo[] = [];
        let sevenDayRiskList: RiskInfo[] = [];
        let riskLevel: {
            [key in '1d' | '3d' | '7d']: { [key: string]: number };
        } = {
            '1d': {},
            '3d': {},
            '7d': {}
        };
        let assetsValue = 0;
        console.log(data);
        data.forEach(item => {
            if (item.created_at > Date.now() - 86400000) {
                oneDayRiskList.push(item);
            } else if (item.created_at > Date.now() - 259200000) {
                threeDayRiskList.push(item);
            } else if (item.created_at > Date.now() - 604800000) {
                sevenDayRiskList.push(item);
            }
            if (item.status === RiskStatus.UnProcessed) {
                assetsValue += item.assets;
            }
        });

        if (oneDayRiskList) {
            oneDayRiskList.forEach(item => {
                if (riskLevel['1d'][item.level]) {
                    riskLevel['1d'][item.level] += 1;
                } else {
                    riskLevel['1d'][item.level] = 1;
                }
            });
        }

        if (threeDayRiskList.length) {
            threeDayRiskList.forEach(item => {
                if (riskLevel['3d'][item.level]) {
                    riskLevel['3d'][item.level] += 1;
                } else {
                    riskLevel['3d'][item.level] = 1;
                }
            });
        }

        if (sevenDayRiskList) {
            sevenDayRiskList.forEach(item => {
                if (riskLevel['7d'][item.level]) {
                    riskLevel['7d'][item.level] += 1;
                } else {
                    riskLevel['7d'][item.level] = 1;
                }
            });
        }

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
                    <RiskAlertCard riskLevel={riskLevel} />
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
