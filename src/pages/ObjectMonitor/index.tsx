import React, { useEffect, useState } from 'react';
import FPPageHeader from '@/components/FPPageHeader';
import ObjectGroup from '@/sections/ObjectMonitor/ObjectGroup';
import ObjectModal from '@/sections/Modals/ObjectModal';
import { UsergroupDeleteOutlined, PlusOutlined } from '@ant-design/icons';
import API from '@/api';
import { useModal } from '@/hooks/useModal';

import { ObjectInfo, ObjectType } from '@/config/commonInterface';
import useGlobalDataStore from '@/store/globalDaraStore';

export interface ObjectModalProps {
    optType: null | 'Add' | 'Edit';
    objectType: null | ObjectType;
    editObjectData: null | ObjectInfo;
}

const defaultModalProps: ObjectModalProps = {
    optType: null,
    objectType: null,
    editObjectData: null
};

function ObjectMonitor() {
    const {
        open: objectModal,
        openModal: openObjectModal,
        closeModal: closeObjectModal
    } = useModal();
    const storeObjectLists = useGlobalDataStore(
        state => state.storeObjectLists
    );

    const [monitoringObjects, setMonitoringObjects] = useState<ObjectInfo[]>(
        []
    );
    const [objectModalProps, setObjectModalProps] =
        useState<ObjectModalProps>(defaultModalProps);

    const getAndUpdateObjectLists = () => {
        API.ObjApi.getObjList()
            .then(res => {
                const objectLists = res.data;
                setMonitoringObjects(objectLists);
                storeObjectLists(objectLists);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleOpenObjectModal = (
        optType: 'Add' | 'Edit',
        objectType: ObjectType,
        editObjectData: null | ObjectInfo
    ) => {
        if (optType === 'Add') {
            setObjectModalProps({
                ...defaultModalProps,
                optType,
                objectType
            });
        } else if (optType === 'Edit') {
            if (editObjectData) {
                setObjectModalProps({
                    ...defaultModalProps,
                    optType,
                    objectType,
                    editObjectData
                });
            } else {
                console.log('you have to pass a edit data');
            }
        }
        openObjectModal();
    };

    const handleCloseObjectModal = () => {
        closeObjectModal();
        setObjectModalProps(defaultModalProps);
    };

    useEffect(() => {
        getAndUpdateObjectLists();
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
                handleOpenObjectModal={handleOpenObjectModal}
            />
            {/* Contract */}
            <ObjectGroup
                objectType={ObjectType.Contract}
                objectLists={monitoringObjects.filter(
                    item => item.category === ObjectType.Contract
                )}
                handleOpenObjectModal={handleOpenObjectModal}
            />
            {/* EOA */}
            <ObjectGroup
                objectType={ObjectType.EOA}
                objectLists={monitoringObjects.filter(
                    item => item.category === ObjectType.EOA
                )}
                handleOpenObjectModal={handleOpenObjectModal}
            />
            {/* Object Modal */}
            {objectModalProps.optType && (
                <ObjectModal
                    open={objectModal}
                    closeModal={handleCloseObjectModal}
                    modalProps={objectModalProps}
                    getAndUpdateObjectLists={getAndUpdateObjectLists}
                />
            )}
        </div>
    );
}

export default ObjectMonitor;
