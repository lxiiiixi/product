import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { siderMenuList } from '@/config/menu';
import { useNavigate, useLocation } from 'react-router-dom';

import { FpLogo } from '@/assets';

function LayoutSider() {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

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
            // style={{ minHeight: "600px", margin: "0" }}
            width={220}
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
