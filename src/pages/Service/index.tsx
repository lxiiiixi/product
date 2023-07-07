import { Card, Button, Row, Col } from "antd";
import { useState } from "react";
import ContactUsFormModal from '@/components/contact_modal';
// import Image from 'next/image';


function Service() {
    return <div>
          <Card
                title={'More professional solutions'}
                // extra={<Button className="mr-1"
                //     onClick={showContactUsModal}>Contact Us</Button>}
                className="m-2 sm:m-5 card-shadow"
            >
                <p className="text-sm text-textGary leading-6 w-10/12">Fairyproof provides one-stop solutions that intelligently and comprehensively monitor the overall blockchain ecosystem‘s situation, fix existing risks, prevent potential risks thus effectively improving the overall ecosystem’s security situation.</p>
                <div style={{ margin: '100px 16px' }}>
                    <Row gutter={[38, 38]} align="stretch" className="flex">
                        <Col span={8}>
                            <Card className="rounded-2xl h-full orange-linear-gradient">
                                <div className="flex-center flex-col text-center intro-img-position">
                                    {/* <Image alt="logo" src="/static/frame1.png" width={200} height={200} /> */}
                                    <h2>Prompt Response & Support</h2>
                                    <p className="text-xs leading-5 text-center">Our engineers will respond to customers on demand or work with customers right after incidents happen, timely provide and deploy solutions.</p>
                                </div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card className="rounded-2xl h-full blue-linear-gradient">
                                <div className="flex-center flex-col text-center intro-img-position">
                                    {/* <Image alt="logo" src="/static/frame2.png" width={200} height={200} /> */}
                                    <h2>Expert Team</h2>
                                    <p className="text-xs leading-5 text-center">Solid Professional Background <br /> Rich Development Experience  <br />  Sustained Research and Exploration</p>
                                </div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card className="rounded-2xl h-full green-yellow-linear-gradient">
                                <div className="flex-center flex-col text-center intro-img-position">
                                    {/* <Image alt="logo" src="/static/frame3.png" width={200} height={200} /> */}
                                    <h2>Customized emergency strategies</h2>
                                    <p className="text-xs leading-5 text-center">Fairyproof will provide customized security services, design and develop solutions based on customers‘ demand for security , their projects’ characteristics and risks‘ severity and urgency.</p>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Card>
    </div>;
}

export default Service;
