import React from "react";
import { Layout, Dropdown, Button, Space } from "antd";
import { MoreOutlined } from "@ant-design/icons";

function LayoutHeader() {
    const userInfo = { nick_name: "user" };

    const handleLoginOut = () => {};
    const items = [
        {
            key: "1",
            label: <div onClick={handleLoginOut}> Login out </div>,
        },
    ];

    return (
        <Layout.Header
            className="flex justify-end h-11 bg-[#F2F8FF]"
            style={{
                lineHeight: "inherit",
                paddingInline: "16px",
            }}
        >
            <div className="inline-flex justify-items-center items-center">
                <Space className="text-gray-400 px-1 flex-center">
                    <span>{userInfo ? userInfo.nick_name : "UserName"}</span>
                    {/* <span className="mr-1">Ethereum</span>
                    <DownOutlined style={{ fontSize: '10px' }} /> */}
                    <span>{/* <ConnectButton /> */}</span>
                    <Button type="text" shape="circle" className="flex-center">
                        <Dropdown
                            menu={{
                                items,
                                selectable: true,
                                defaultSelectedKeys: ["1"],
                            }}
                        >
                            <MoreOutlined style={{ color: "#666", fontSize: "18px" }} />
                        </Dropdown>
                    </Button>
                </Space>
            </div>
        </Layout.Header>
    );
}

export default LayoutHeader;
