import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import LayoutSider from './LayoutSections/LayoutSider';
import LayoutFooter from './LayoutSections/LayoutFooter';
import LayoutHeader from './LayoutSections/LayoutHeader';

import API from '@/api';
import useGlobalDataStore from '@/store/globalDaraStore';

function PageLayout() {
    const storeObjectLists = useGlobalDataStore(
        state => state.storeObjectLists
    );
    const storeRiskLists = useGlobalDataStore(state => state.storeRiskLists);
    const storeStrategyLists = useGlobalDataStore(
        state => state.storeStrategyLists
    );

    const getObjectList = () => {
        API.ObjApi.getObjList()
            .then(res => {
                const objectLists = res.data;
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

    return (
        <Layout>
            <LayoutSider />
            <Layout className="min-h-screen bg-[#F2F8FF]">
                <LayoutHeader />
                <Layout.Content className="p-5">
                    <Outlet />
                </Layout.Content>
                <LayoutFooter isLandPage={false} />
            </Layout>
        </Layout>
    );
}

export default PageLayout;
