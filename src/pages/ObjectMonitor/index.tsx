import React, { useEffect, useState } from 'react';
import FPPageHeader from '@/components/FPPageHeader';
import ObjectGroup from '@/sections/ObjectMonitor/ObjectGroup';
import ObjectModal from '@/sections/Modals/ObjectModal';
import { UsergroupDeleteOutlined, PlusOutlined } from '@ant-design/icons';
import API from '@/api';
import { useModal } from '@/hooks/useModal';

import { ObjectInfo, ObjectType } from '@/config/commonInterface';

export interface ObjectModalProps {
    optType: 'None' | 'Add' | 'Edit';
    objectType: 'None' | ObjectType;
    editObjectData: {};
}

const defaultModalProps = {
    optType: 'None',
    objectType: 'None',
    editObjectData: {}
};

function ObjectMonitor() {
    const {
        open: objectModal,
        openModal: openObjectModal,
        closeModal: closeObjectModal
    } = useModal();

    const [monitoringObjects, setMonitoringObjects] = useState<ObjectInfo[]>(
        []
    );
    const [objectModalProps, setObjectModalProps] =
        useState<ObjectModalProps>(defaultModalProps);

    const getObjectLists = () => {
        API.ObjApi.getObjList()
            .then(res => {
                console.log(res);
                setMonitoringObjects(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        getObjectLists();
    }, []);

    return (
        <div>
            <FPPageHeader
                icon={<UsergroupDeleteOutlined />}
                text="Object Monitoring"
            />
            {/* Token */}
            <ObjectGroup
                objectType={ObjectType.Token}
                objectLists={monitoringObjects.filter(
                    item => item.category === ObjectType.Token
                )}
            ></ObjectGroup>
            {/* Contract */}
            <ObjectGroup
                objectType={ObjectType.Contract}
                objectLists={monitoringObjects.filter(
                    item => item.category === ObjectType.Contract
                )}
            ></ObjectGroup>
            {/* EOA */}
            <ObjectGroup
                objectType={ObjectType.EOA}
                objectLists={monitoringObjects.filter(
                    item => item.category === ObjectType.EOA
                )}
            ></ObjectGroup>
            {/* Modal */}
            <ObjectModal
                open={objectModal}
                closeModal={closeObjectModal}
                modalProps={objectModalProps}
            />
        </div>
    );
}

export default ObjectMonitor;
