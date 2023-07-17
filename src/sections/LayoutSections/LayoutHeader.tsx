import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Dropdown, Button, Space } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import useUserInfoStore from '@/store/userInfoStore';
import API from '@/api';

function LayoutHeader() {
    const navigate = useNavigate();
    const userInfo = useUserInfoStore(state => state.userInfo);

    const handleLoginOut = () => {
        API.UserApi.logout()
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log('error', err);
            });
        navigate('/product');
    };

    const items = [
        {
            key: '1',
            label: <div onClick={handleLoginOut}> Logout </div>
        }
    ];

    return (
        <Layout.Header
            className="flex justify-end h-16 bg-[#F2F8FF]"
            style={{
                lineHeight: 'inherit',
                paddingInline: '16px'
            }}
        >
            <div className="inline-flex justify-items-center items-center">
                <Space className="text-gray-400 px-1 flex-center">
                    <span>
                        {userInfo.userName ? userInfo.userName : 'UserName'}
                    </span>
                    <Button type="text" shape="circle" className="flex-center">
                        <Dropdown
                            menu={{
                                items,
                                selectable: true,
                                defaultSelectedKeys: ['1']
                            }}
                        >
                            <MoreOutlined
                                style={{ color: '#666', fontSize: '18px' }}
                            />
                        </Dropdown>
                    </Button>
                    <ConnectButton />
                </Space>
            </div>
        </Layout.Header>
    );
}

export default LayoutHeader;
