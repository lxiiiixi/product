import { Dropdown, Menu, Space } from 'antd';
import {
    CaretDownOutlined,
    LinkedinOutlined,
    TwitterOutlined,
    MediumOutlined,
    MenuOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { FpLogo, SubstackLogo, TelegramLogo } from '@/assets';
import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

const companyMenu = [
    { key: '0', label: <a href="/company/about">About</a> },
    { key: '1', label: <a href="/company/careers">Careers</a> },
    { key: '2', label: <a href="/company/disclaimer">Disclaimer</a> }
];

const mediaMenu = [
    {
        key: '0',
        label: (
            <a
                target="_blank"
                rel="noreferrer"
                href="https://medium.com/@FairyproofT"
            >
                <Space>
                    <span
                        style={{
                            lineHeight: '20px',
                            textAlign: 'center',
                            display: 'inline-block',
                            backgroundColor: '#00494D',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            color: '#fff'
                        }}
                    >
                        <MediumOutlined />
                    </span>
                    medium
                </Space>
            </a>
        )
    },
    {
        key: '1',
        label: (
            <a
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/@FairyproofT"
            >
                <Space>
                    <span
                        style={{
                            lineHeight: '20px',
                            textAlign: 'center',
                            display: 'inline-block',
                            backgroundColor: '#00494D',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            color: '#fff'
                        }}
                    >
                        <TwitterOutlined />
                    </span>
                    Twitter
                </Space>
            </a>
        )
    },
    {
        key: '2',
        label: (
            <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.cn/injobs/home"
            >
                <Space>
                    <span
                        style={{
                            lineHeight: '20px',
                            textAlign: 'center',
                            display: 'inline-block',
                            backgroundColor: '#00494D',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            color: '#fff'
                        }}
                    >
                        <LinkedinOutlined />
                    </span>
                    LinkedIn
                </Space>
            </a>
        )
    },
    {
        key: '3',
        label: (
            <a
                target="_blank"
                rel="noreferrer"
                href="https://t.me/Fairyproof_tech"
            >
                <Space>
                    <span
                        style={{
                            lineHeight: '20px',
                            textAlign: 'center',
                            display: 'inline-block',
                            backgroundColor: '#00494D',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            color: '#fff'
                        }}
                    >
                        <img src={TelegramLogo} />
                    </span>
                    Telegram
                </Space>
            </a>
        )
    },
    {
        key: '4',
        label: (
            <a
                target="_blank"
                rel="noreferrer"
                href="https://fairyproof.substack.com/"
            >
                <Space>
                    <span
                        style={{
                            lineHeight: '20px',
                            textAlign: 'center',
                            display: 'inline-block',
                            backgroundColor: '#00494D',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            color: '#fff'
                        }}
                    >
                        <img src={SubstackLogo} />
                    </span>
                    Substack
                </Space>
            </a>
        )
    }
];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type
    };
}

const mobileMenu = [
    {
        key: '0',
        label: (
            <Menu
                items={[
                    getItem(
                        'Products',
                        1,
                        null,
                        [
                            getItem(
                                <a href="/products/audit-intro">
                                    Security Audit
                                </a>,
                                '01'
                            ),
                            getItem(
                                <a href="/products/tools">Security Tools</a>,
                                '02'
                            ),
                            getItem(
                                <a href="/products/uservice">
                                    General Data Queries
                                </a>,
                                '03'
                            ),
                            getItem(
                                <a href="/products/audit">
                                    Verify Audited Projects
                                </a>,
                                '04'
                            )
                        ],
                        'group'
                    )
                ]}
            />
        )
    },
    {
        key: '1',
        label: (
            <Menu
                items={[
                    getItem(
                        'Company',
                        2,
                        null,
                        [
                            getItem(<a href="/company/about">About</a>, '11'),
                            getItem(
                                <a href="/company/careers">Careers</a>,
                                '12'
                            ),
                            getItem(
                                <a href="/company/disclaimer">Disclaimer</a>,
                                '13'
                            )
                        ],
                        'group'
                    )
                ]}
            />
        )
    },
    {
        key: '2',
        label: (
            <Menu
                items={[
                    getItem(
                        'Media',
                        3,
                        null,
                        [
                            getItem(
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://medium.com/@FairyproofT"
                                >
                                    Medium
                                </a>,
                                '21'
                            ),
                            getItem(
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://twitter.com/FairyproofT"
                                >
                                    Twitter
                                </a>,
                                '22'
                            ),
                            getItem(
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://t.me/Fairyproof_tech"
                                >
                                    Telegram
                                </a>,
                                '23'
                            ),
                            getItem(
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://fairyproof.substack.com/"
                                >
                                    Substack
                                </a>,
                                '24'
                            )
                        ],
                        'group'
                    )
                ]}
            />
        )
    }
];

export default function HeaderBar() {
    return (
        <header className=" bg-white w-full h-24 flex items-center justify-between fixed z-50 px-6 md:px-12 lg:px-28">
            <a title="fairypoof" href="/#/product">
                <img src={FpLogo} alt="logo" width={185} height={50} />
            </a>
            <Space size={50} className="hidden md:flex md:items-center ">
                <div>
                    <a href="/">Products</a>
                </div>
                <div className="cursor-pointer">
                    <Dropdown menu={{ items: companyMenu }}>
                        <a>
                            Company
                            <CaretDownOutlined className="ml-1" />
                        </a>
                    </Dropdown>
                </div>
                <div className="cursor-pointer">
                    <Dropdown menu={{ items: mediaMenu }}>
                        <a>
                            Social Media
                            <CaretDownOutlined className="ml-1" />
                        </a>
                    </Dropdown>
                </div>
            </Space>
            <Space size={20} className="md:hidden">
                <SearchOutlined className="cursor-pointer text-xl" />
                <Dropdown
                    menu={{ items: mobileMenu }}
                    placement="bottomRight"
                    trigger={['click']}
                    className="text-xl"
                >
                    <MenuOutlined />
                </Dropdown>
            </Space>
        </header>
    );
}
