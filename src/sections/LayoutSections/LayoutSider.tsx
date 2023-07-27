import { useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { siderMenuList } from '@/config/menu';
import { useNavigate, useLocation } from 'react-router-dom';

import { FpLogo } from '@/assets';

import API from '@/api';
import useGlobalDataStore from '@/store/globalDaraStore';

function LayoutSider() {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

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
        if (path !== '/service') {
            // && path !== '/dashboard'
            getObjectList();
            getRiskList();
            getStrategyList();
        }
    }, [path]);

    function getSelectedKeys() {
        const id = siderMenuList.find(item => item.path === path)?.key;
        return [id || ''];
    }

    const handleClick = ({ key }: { key: string }) => {
        const path = siderMenuList.find(item => item.key === key)?.path;
        path && navigate(path);
    };

    return (
        <Layout.Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                // console.log(broken);
            }}
            theme="light"
            className="z-10"
            width={220}
            // style={{ minHeight: "600px", margin: "0" }}
        >
            <div className="flex-center my-11">
                <img src={FpLogo} className="w-[185px] h-[50px]" />
            </div>
            <Menu
                theme="light"
                mode="inline"
                items={siderMenuList.map(item => ({
                    key: item.key,
                    icon: item.icon,
                    label: (
                        <Link to={`${item.path}`} className="text-xs">
                            {item.title}
                        </Link>
                    )
                }))}
                selectedKeys={getSelectedKeys()}
                onClick={handleClick}
            />
        </Layout.Sider>
    );
}

export default LayoutSider;
