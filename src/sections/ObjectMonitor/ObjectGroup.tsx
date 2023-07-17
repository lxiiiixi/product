import React from 'react';
import ObjectGroupHead from './ObjectGroupHead';
import { ObjectType, ObjectInfo } from '@/config/commonInterface';
import { Card, Row, Col, message, Button } from 'antd';
import MonitorObjectCard from './MonitorObjectCard';
import FPAddCard from '@/components/FPAddCard';

function ObjectGroup({
    objectType,
    objectLists,
    handleOpenObjectModal
}: {
    objectType: ObjectType;
    objectLists: ObjectInfo[];
    handleOpenObjectModal: (
        optType: 'Add' | 'Edit',
        objectType: ObjectType,
        editObjectData: null | ObjectInfo
    ) => void;
}) {
    return (
        <div className="objects my-2">
            <ObjectGroupHead objectType={objectType} />
            <Row gutter={[18, 18]}>
                {objectLists.map(item => (
                    <Col xs={24} sm={24} md={12} lg={12} key={item._id.$oid}>
                        <MonitorObjectCard />;
                        {/* <Button
                            onClick={() => {
                                handleOpenModal(
                                    'Edit',
                                    objectType,
                                    objectLists[0]
                                );
                            }}
                        >
                            edit
                        </Button> */}
                        {/* <MonitorObjectCard
                            editObject={editObject}
                            deleteObject={deleteObject}
                            objectData={item}
                            objectType={objectType}
                            allStrategies={strategies}
                            updateMonitoringObjects={updateMonitoringObjects}
                        /> */}
                    </Col>
                ))}
                <Col xs={24} sm={24} md={12} lg={12}>
                    <FPAddCard
                        addFunction={() => {
                            handleOpenObjectModal('Add', objectType, null);
                        }}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default ObjectGroup;
