import React, { useMemo } from 'react';
import { Row, Col } from 'antd';
import FPCard from '@/components/FPCard';
import FPInput from '@/components/FPInput';
import { SearchOutlined } from '@ant-design/icons';
import BubbleUI from 'react-bubble-ui';
import BubbleChild from './BubbleChild';
import 'react-bubble-ui/dist/index.css';
import { ObjectInfo, ObjectType } from '@/config/commonInterface';

// 方案一：https://github.com/ire4564/react-tooltip-bubble-chart
// 方案二：https://github.com/blakesanie/React-Bubble-UI

// 参考：https://bubbleui.blakesanie.com/#/demo
const BubbkeOptions = {
    size: 120, // 最大尺寸px
    minSize: 80, // 最小尺寸px
    gutter: 20, // 间距
    provideProps: true,
    numCols: 5, // 横轴最多放几个球
    fringeWidth: 160,
    yRadius: 330,
    xRadius: 200,
    cornerRadius: 50,
    showGuides: false,
    compact: true,
    gravitation: 5
} as const;

function BubbleContainer({
    data,
    selectedObjId,
    switchFocusedObject
}: {
    data: ObjectInfo[];
    selectedObjId: string;
    switchFocusedObject: (id: string) => void;
}) {
    const getNums = (type: ObjectType) =>
        data.filter(item => item.category === type).length;
    const tokenNums = useMemo(() => getNums(ObjectType.Token), [data]);
    const contractNums = useMemo(() => getNums(ObjectType.Contract), [data]);
    const eoaNums = useMemo(() => getNums(ObjectType.EOA), [data]);

    return (
        <FPCard
            title="Monitored objects"
            headStyle={{ backgroundColor: '#4C68EC', color: '#fff' }}
            extra={
                <FPInput
                    prefix={<SearchOutlined />}
                    allowClear
                    placeholder="Input the name or address of monitored object"
                    className="border-none rounded-xl w-[180px] md:w-[320px]"
                />
            }
        >
            <Row>
                <Col
                    xs={24}
                    sm={24}
                    md={3}
                    lg={3}
                    className="h-auto flex justify-between sm:justify-center sm:flex-col text-xl text-main-textGray "
                >
                    <div className="flex items-center">
                        <span>{tokenNums}</span>
                        <span className="text-white flex-center text-xs bg-object-token w-14 h-5 rounded-lg ml-1">
                            Token
                        </span>
                    </div>
                    <div className="flex sm:my-4 items-center">
                        <span>{contractNums}</span>
                        <span className="text-white flex-center text-xs bg-object-contract w-14 h-5 rounded-lg ml-1">
                            Contract
                        </span>
                    </div>
                    <div className="flex items-center">
                        <span>{eoaNums}</span>
                        <span className="text-white flex-center text-xs bg-object-eoa w-14 h-5 rounded-lg ml-1">
                            EOA
                        </span>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={21} lg={21} className="mt-4 md:mt-0">
                    <BubbleUI
                        options={BubbkeOptions}
                        className="w-full h-[320px]"
                    >
                        {data.map(item => {
                            return (
                                <BubbleChild
                                    selectedObjId={selectedObjId}
                                    data={item}
                                    key={item._id.$oid}
                                    setClick={switchFocusedObject}
                                />
                            );
                        })}
                    </BubbleUI>
                </Col>
            </Row>
        </FPCard>
    );
}

export default BubbleContainer;
