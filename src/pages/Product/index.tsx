// import React from 'react'
import { Button, Space } from 'antd';
import { IntroIndex } from '@/assets';
import '@fontsource-variable/oswald/index.css';

function Product() {
    return (
        <div className="relative h-fit">
            <div className="z-50 lg:w-1/2 pt-16 text-[#323e51]">
                <div
                    className="text-7xl leading-[0.94] font-bold"
                    style={{ fontFamily: 'Oswald Variable' }}
                >
                    <p>Together</p>
                    <p>we can make</p>
                    <p>the world of Web3.0</p>
                    <p>a safer place.</p>
                </div>
                <div className="text-lg leading-normal inter-stitle my-5 text-main-textGray">
                    <p>
                        Fairyproof provides one-stop solutions that
                        intelligently and comprehensively monitor the overall
                        blockchain ecosystem‘s situation, fix existing risks,
                        prevent potential risks thus effectively improving the
                        overall ecosystem’s security situation.
                    </p>
                </div>
                <Space>
                    <a href="/#/product/signup">
                        <Button
                            type="primary"
                            size="large"
                            shape="round"
                            className="mr-1"
                        >
                            Sign up
                        </Button>
                    </a>
                    <a href="/#/product/login">
                        <Button
                            type="primary"
                            size="large"
                            shape="round"
                            className=""
                        >
                            Sign in
                        </Button>
                    </a>
                </Space>
            </div>
            <img
                src={IntroIndex}
                alt="logo"
                className="absolute -right-20 top-10 z-0 w-full hidden lg:block"
                style={{ width: '82%' }}
            />
        </div>
    );
}

export default Product;
