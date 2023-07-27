import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import LayoutSider from './LayoutSections/LayoutSider';
import LayoutFooter from './LayoutSections/LayoutFooter';
import LayoutHeader from './LayoutSections/LayoutHeader';

function PageLayout() {
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
