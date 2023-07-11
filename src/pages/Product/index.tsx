// import React from 'react'
import { Button } from 'antd';
import LandPageLayout from '@/sections/LandPageLayout';
import { IntroIndex } from '@/assets';

function Product() {
  return (
    <LandPageLayout>
      <div className="relative">
        <div className="z-20 lg:w-1/2 pt-10 text-[#323e51]">
          <div className="text-6xl leading-8 font-['Oswald'] font-bold">
            <p>Together</p>
            <p>we can make</p>
            <p>the world of Web3.0</p>
            <p>a safer place.</p>
          </div>
          <div className="text-lg leading-normal inter-stitle my-3">
            <p>
              Fairyproof provides one-stop solutions that intelligently and
              comprehensively monitor the overall blockchain ecosystem‘s
              situation, fix existing risks, prevent potential risks thus
              effectively improving the overall ecosystem’s security situation.
            </p>
          </div>
          <div className="flex items-left justify-left">
            <a href="/signup">
              <Button
                type="primary"
                size="large"
                shape="round"
                className="mr-1"
              >
                Sign up
              </Button>
            </a>
            <a href="/login">
              <Button type="primary" size="large" shape="round" className="">
                Sign in
              </Button>
            </a>
          </div>
        </div>
        <img
          src={IntroIndex}
          alt="logo"
          className="absolute -right-20 top-10 z-0 w-full hidden lg:block"
          style={{ width: '82%' }}
        />
      </div>
    </LandPageLayout>
  );
}

export default Product;
