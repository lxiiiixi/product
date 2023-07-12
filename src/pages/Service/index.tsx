import { useState } from 'react';
import { Card, Button, Row, Col } from 'antd';
import ContactUsFormModal from '@/sections/Modals/ContactUsModal';
import FPCard from '@/components/FPCard';

import { Service_1, Service_2, Service_3 } from '@/assets';

function Service() {
  return (
    <div>
      <FPCard
        title="More professional solutions"
        // extra={<Button className="mr-1"
        //     onClick={showContactUsModal}>Contact Us</Button>}
        className="m-2 sm:m-5"
      >
        <p className="text-sm text-main-textGray leading-6 w-10/12">
          Fairyproof provides one-stop solutions that intelligently and
          comprehensively monitor the overall blockchain ecosystem‘s situation,
          fix existing risks, prevent potential risks thus effectively improving
          the overall ecosystem’s security situation.
        </p>
        <div className="my-[100px] mx-[16px]">
          <Row gutter={[38, 38]} align="stretch" className="flex">
            <Col span={8}>
              <Card className="rounded-2xl h-full text-white bg-gradient-to-t from-[#fb6e37] to-[#fbc825]">
                <div className="flex-center flex-col text-center relative -top-[80px] ">
                  <img alt="logo" src={Service_1} width={200} height={200} />
                  <h2>Prompt Response & Support</h2>
                  <p className="text-xs leading-5 text-center">
                    Our engineers will respond to customers on demand or work
                    with customers right after incidents happen, timely provide
                    and deploy solutions.
                  </p>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="rounded-2xl h-full text-white bg-gradient-to-t from-[#1d9fd6] to-[#60e0f7]">
                <div className="flex-center flex-col text-center relative -top-[80px]">
                  <img alt="logo" src={Service_2} width={200} height={200} />
                  <h2>Expert Team</h2>
                  <p className="text-xs leading-5 text-center">
                    Solid Professional Background <br /> Rich Development
                    Experience <br /> Sustained Research and Exploration
                  </p>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="rounded-2xl h-full text-white bg-gradient-to-t from-[#52d8af] to-[#44e65c]">
                <div className="flex-center flex-col text-center relative -top-[80px]">
                  <img alt="logo" src={Service_3} width={200} height={200} />
                  <h2>Customized emergency strategies</h2>
                  <p className="text-xs leading-5 text-center">
                    Fairyproof will provide customized security services, design
                    and develop solutions based on customers‘ demand for
                    security , their projects’ characteristics and risks‘
                    severity and urgency.
                  </p>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </FPCard>
    </div>
  );
}

export default Service;
