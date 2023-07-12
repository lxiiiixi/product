import React from 'react';

import { Card, Radio, Row, Col } from 'antd';
import FPCard from '@/components/FPCard';

import { SafetyOutlined, FieldTimeOutlined } from '@ant-design/icons';

import { ThreatenedAssetsLogo, DashboardAssets } from '@/assets';

function ValueDisplay() {
  return (
    <FPCard className="text-white bg-[#f3f8fe]">
      <Row gutter={[0, 12]} className="h-full" justify="space-between">
        <Col xs={8} sm={24} md={24} lg={10} xl={7}>
          <FPCard className="bg-gradient-to-t from-[#fb6e37] to-[#fbc825] h-full text-white overflow-hidden">
            <div className="flex justify-center items-center">
              <div className="rounded-md mr-2 w-8 h-8 p-3 flex-center bg-white/30">
                <img src={ThreatenedAssetsLogo} width={25} height={25} />
              </div>
              <p className="text-center text-xs sm:text-sm">
                Threatened <br />
                Assets Value:
              </p>
            </div>
            <div className="text-center my-3">
              <span className="text-3xl lg:text-5xl font-semibold">
                {/* {`${
                assetsValue >= 1000000
                  ? (assetsValue / 1000000).toFixed(2) + 'M'
                  : assetsValue
              }`} */}
                $1.4M
              </span>
            </div>
            <img
              src={DashboardAssets}
              width="130px"
              className="absolute right-0 bottom-0"
            />
          </FPCard>
        </Col>
        <Col xs={14} sm={24} md={24} lg={13} xl={16}>
          <Row gutter={[0, 12]} className="content-between h-full">
            <Col xs={24} sm={24} md={24} lg={24}>
              <FPCard className="bg-gradient-to-t from-[#52d8af] to-[#44e65c] p-2 sm:p-3 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="title-icon-block rounded-md mr-2 w-8 h-8 p-3 flex-center bg-white/30">
                      <SafetyOutlined style={{ fontSize: '20px' }} />
                    </span>
                    <p>Security Shield</p>
                  </div>
                  <div>
                    <span className="text-5xl inline-block mr-1">263</span>
                    <span>days</span>
                  </div>
                </div>
              </FPCard>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <FPCard className="bg-gradient-to-t from-[#1d9fd6] to-[#60e0f7] p-2 sm:p-3 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="title-icon-block rounded-md mr-2 w-8 h-8 p-3 flex-center bg-white/30">
                      <FieldTimeOutlined style={{ fontSize: '20px' }} />
                    </span>
                    <p>Emergency strategies</p>
                  </div>
                  <div>
                    <span className="text-5xl inline-block mr-1">
                      {/* {strategyCount} */}2
                    </span>
                    <span>Activated</span>
                  </div>
                </div>
              </FPCard>
            </Col>
          </Row>
        </Col>
      </Row>
    </FPCard>
  );
}

export default ValueDisplay;
