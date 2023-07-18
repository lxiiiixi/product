// import { useEffect, useCallback, useMemo, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useNavigate } from 'react-router-dom';

import { Row, Col, message, Tooltip } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    SettingOutlined,
    ArrowRightOutlined,
    CopyOutlined
} from '@ant-design/icons';
import { EthLogo } from '@/assets';
import FPCard from '@/components/FPCard';

import { ObjectInfo, ObjectStatus } from '@/config/commonInterface';

const MonitorObjectCard = ({
    objectData,
    handleOpenDeleteObjectModal,
    handleEditobjectModal,
    handleOpenMonitorModal,
    handleOpenStyModal
}: {
    objectData: ObjectInfo;
    handleOpenDeleteObjectModal: (objectId: string, objectName: string) => void;
    handleEditobjectModal: (data: ObjectInfo) => void;
    handleOpenMonitorModal: () => void;
    handleOpenStyModal: (objectId: string, strategy: string | null) => void;
}) => {
    const navigate = useNavigate();

    const { _id, address, rules, name, strategies, monitors, status } =
        objectData;

    const statusColor = {
        // status 不存在就默认 Safe
        Safe: '#00d5a5',
        Danger: '#ff909b',
        Warning: '#00d5a6'
    };

    // const confirmDeleteObject = () => {
    //     deleteObject(_id.$oid);
    //     setModalOpen(false);
    // };

    // const closeModal = (ifUpdate = false) => {
    //     setModalOpen(false);
    //     if (ifUpdate) updateMonitoringObjects();
    // };

    return (
        <FPCard
            className="h-[250px]"
            title={
                <div className="text-lg font-normal text-white">
                    {name}
                    <span
                        className="text-xs cursor-pointer mx-2"
                        onClick={() => {
                            handleEditobjectModal(objectData);
                        }}
                    >
                        <SettingOutlined />
                    </span>
                    <span
                        className="text-xs cursor-pointer"
                        onClick={() => {
                            handleOpenDeleteObjectModal(_id.$oid, name);
                        }}
                    >
                        <DeleteOutlined />
                    </span>
                </div>
            }
            extra={
                <span
                    className="px-3 text-xs rounded-lg bg-white"
                    style={{
                        color: status
                            ? statusColor[status]
                            : statusColor['Safe']
                    }}
                >
                    {status}
                </span>
            }
            headStyle={{
                backgroundColor: status
                    ? statusColor[status]
                    : statusColor['Safe']
            }}
            bodyStyle={{ padding: '4%' }}
        >
            <div className="flex items-center">
                <img
                    alt="logo"
                    src={EthLogo}
                    width={22}
                    height={22}
                    className="-ml-1"
                />
                <span className="bg-indigo-100 px-1 rounded text-xs leading-5 mx-1">
                    {address}
                </span>
                <CopyToClipboard text={address} onCopy={() => {}}>
                    <Tooltip placement="top" title="Copied !" trigger="click">
                        <span className="text-xs cursor-pointer">
                            <CopyOutlined />
                        </span>
                    </Tooltip>
                </CopyToClipboard>
            </div>
            <Row className="text-gray-500 my-4 flex justify-between">
                <Col span={8}>
                    <div className="text-xs">Monitoring rules</div>
                    <div className="my-1">
                        {rules?.length ? rules.length : 0}
                        <span
                            className="text-xs ml-1 text-gray-400 cursor-pointer"
                            onClick={() => {
                                // router.push(`/monitor/${_id.$oid}`);
                            }}
                        >
                            <EditOutlined />
                        </span>
                    </div>
                    {/* <div className="my-1"> {rules?.length ? rules.length : 0} <span className="text-xs ml-1 text-gray-400 cursor-pointer" onClick={() => { setModalOpen("rule") }}><EditOutlined /></span> </div> */}
                </Col>
                <Col span={7}>
                    <div className="text-xs">FP Monitors</div>
                    <div className="my-1">
                        {monitors?.length ? monitors.length : 0}
                        <span
                            className="text-xs ml-1 text-gray-400 cursor-pointer"
                            onClick={() => {
                                handleOpenMonitorModal();
                            }}
                        >
                            <EditOutlined />
                        </span>
                    </div>
                </Col>
                <Col span={9}>
                    <div className="text-xs">Emergency strategy</div>
                    <div className="my-1 flex items-center">
                        <div className="text-xs text-black">{strategies}</div>
                        <div
                            className="text-gray-400 cursor-pointer ml-1"
                            onClick={() => {
                                handleOpenStyModal(
                                    _id.$oid,
                                    strategies?.length ? strategies[0] : null
                                );
                            }}
                        >
                            {/* waiting: 策略绑定的这里应该是复选框才对吧 */}
                            <EditOutlined />
                        </div>
                    </div>
                </Col>
            </Row>
            <div
                className=" text-xs text-gray-500 absolute bottom-3 right-5 cursor-pointer"
                onClick={() => {
                    // router.push('./situation');
                    navigate('../situation');
                }}
            >
                Security Situation <ArrowRightOutlined />
            </div>
        </FPCard>
    );
};

export default MonitorObjectCard;
