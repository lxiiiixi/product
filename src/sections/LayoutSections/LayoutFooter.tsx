import { ReactNode } from 'react';
import { Col, Row, Layout, Space } from 'antd';
import {
    LinkedinOutlined,
    TwitterOutlined,
    MediumOutlined
} from '@ant-design/icons';

import { FpLogo, SubstackLogo, TelegramLogo } from '@/assets';

const SocialMedia = [
    {
        href: 'https://medium.com/@FairyproofT',
        title: 'Medium',
        icon: <MediumOutlined color="#fff" />
    },
    {
        href: 'https://twitter.com/FairyproofT',
        title: 'Twitter',
        icon: <TwitterOutlined color="#fff" />
    },
    {
        href: 'https://www.linkedin.cn/injobs/home',
        title: 'LinkedIn',
        icon: <LinkedinOutlined color="#fff" />
    },
    {
        href: 'https://fairyproof.substack.com/',
        title: 'Substack',
        icon: (
            <span className="flex-center">
                <img src={TelegramLogo} />
            </span>
        )
    },
    {
        href: 'https://t.me/Fairyproof_tech',
        title: 'Telegram',
        icon: (
            <span className="flex-center">
                <img src={SubstackLogo} />
            </span>
        )
    }
];
export default function LayoutFooter({ isLandPage }: { isLandPage: boolean }) {
    const FooterLinks = ({
        href,
        title,
        icon
    }: {
        href: string;
        title: string;
        icon: ReactNode;
    }) => {
        return (
            <a
                className="flex-center text-[12px] gap-x-1 hover:underline text-black font-normal"
                target="_blank"
                rel="noreferrer"
                href={href}
            >
                <span className="rounded-full text-white bg-main-blue text-sm w-5 h-5 flex-center">
                    {icon}
                </span>
                <span className="hidden sm:inline-block">{title}</span>
            </a>
        );
    };

    return (
        <>
            {isLandPage ? (
                <Layout.Footer className=" bg-white">
                    <Space size={30} className="flex justify-center pt-3 pb-5">
                        {SocialMedia.map((item, index) => {
                            return <FooterLinks key={index + 1} {...item} />;
                        })}
                    </Space>
                    <div className="text-xs w-full text-center p-2">
                        © 2023, by Fairyproof. All Rights Reserved
                    </div>
                </Layout.Footer>
            ) : (
                <Layout.Footer className="bg-[#F2F8FF]">
                    <Row justify="space-between" align="middle">
                        <Col
                            className="mb-15 flex justify-center md:justify-start"
                            xs={24}
                            sm={24}
                            md={6}
                            lg={6}
                            xl={6}
                        >
                            <a href="/dashboard" title="fairypoof">
                                <img
                                    src={FpLogo}
                                    alt="fairypoof"
                                    className="w-[225px] h-[65px]"
                                />
                            </a>
                        </Col>
                        <Col
                            className="flex gap-x-6 lg:gap-x-10 item-center justify-center lg:justify-start w-full p-6"
                            xs={24}
                            sm={24}
                            md={18}
                            lg={18}
                            xl={18}
                        >
                            {SocialMedia.map((item, index) => {
                                return (
                                    <FooterLinks key={index + 1} {...item} />
                                );
                            })}
                        </Col>
                    </Row>
                    <div className="text-xs w-full max-w-[1200px] text-center p-2">
                        © 2023, by Fairyproof. All Rights Reserved
                    </div>
                </Layout.Footer>
            )}
        </>
    );
}
