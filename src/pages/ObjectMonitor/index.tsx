import { useEffect, useState } from 'react';
import FPPageHeader from '@/components/FPPageHeader';
import ObjectGroup from '@/sections/ObjectMonitor/ObjectGroup';
import ObjectModal from '@/sections/Modals/ObjectModal';
import { UsergroupDeleteOutlined } from '@ant-design/icons';
import API from '@/api';
import { useModal } from '@/hooks/useModal';
import { ObjectInfo, ObjectType } from '@/config/commonInterface';
import useGlobalDataStore from '@/store/globalDaraStore';

import ObjectDeleteModal from '@/sections/Modals/ObjectDeleteModal';
import MonitorModal from '@/sections/Modals/MonitorModal';
import SelectStrategyModal from '@/sections/Modals/SelectStrategyModal';

export interface ObjectModalProps {
    optType: null | 'Add' | 'Edit';
    objectType: null | ObjectType;
    editObjectData: null | ObjectInfo;
}

export interface StrategyModalProps {
    objectId: null | string; // 当前操作对象的id
    strategy: null | string; // 当前编辑对象的策略
}

export interface DeleteObjectModalProps {
    objectId: null | string; // 当前操作对象的id
    objectName: null | string;
}

const defaultObjectModalProps: ObjectModalProps = {
    optType: null,
    objectType: null,
    editObjectData: null
};

const defaultStrategyModalProps: StrategyModalProps = {
    objectId: null,
    strategy: null
};

const defaultDeleteModalProps: DeleteObjectModalProps = {
    objectId: null,
    objectName: null
};

function ObjectMonitor() {
    const {
        open: objectModal,
        openModal: openObjectModal,
        closeModal: closeObjectModal
    } = useModal();
    const {
        open: objectDeleteModal,
        openModal: openObjectDeleteModal,
        closeModal: closeObjectDeleteModal
    } = useModal();
    const {
        open: objectMonitorModal,
        openModal: openObjectMonitorModal,
        closeModal: closeObjectMonitorModal
    } = useModal();
    const {
        open: objectStyModal,
        openModal: openObjectStyModal,
        closeModal: closeObjectStyModal
    } = useModal();

    const storeObjectLists = useGlobalDataStore(
        state => state.storeObjectLists
    );

    const [monitoringObjects, setMonitoringObjects] = useState<ObjectInfo[]>(
        []
    );
    const [objectModalProps, setObjectModalProps] = useState<ObjectModalProps>(
        defaultObjectModalProps
    );
    const [strategyModalProps, setStrategyModalProps] =
        useState<StrategyModalProps>(defaultStrategyModalProps);
    const [deleteModalProps, setDeleteModalProps] =
        useState<DeleteObjectModalProps>(defaultDeleteModalProps);

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

    useEffect(() => {
        getAndUpdateObjectLists();
    }, []);

    const handleOpenObjectModal = (
        optType: 'Add' | 'Edit',
        objectType: ObjectType,
        editObjectData: null | ObjectInfo
    ) => {
        if (optType === 'Add') {
            setObjectModalProps({
                ...defaultObjectModalProps,
                optType,
                objectType
            });
        } else if (optType === 'Edit') {
            if (editObjectData) {
                setObjectModalProps({
                    ...defaultObjectModalProps,
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
        setObjectModalProps(defaultObjectModalProps);
    };

    const handleOpenDeleteObjectModal = (
        objectId: string,
        objectName: string
    ) => {
        setDeleteModalProps({ objectId, objectName });
        openObjectDeleteModal();
    };

    const handleCloseDeleteObjectModal = () => {
        setDeleteModalProps(defaultDeleteModalProps);
        closeObjectDeleteModal();
    };

    const handleOpenMonitorModal = () => {
        openObjectMonitorModal();
    };

    const handleOpenStyModal = (objectId: string, strategy: string | null) => {
        setStrategyModalProps({ objectId, strategy });
        openObjectStyModal();
    };

    const handleCloseStyModal = () => {
        closeObjectStyModal();
        setStrategyModalProps(defaultStrategyModalProps);
    };

    return (
        <div>
            <FPPageHeader
                icon={<UsergroupDeleteOutlined />}
                text="Object Monitoring"
            />
            {Object.values(ObjectType).map(item => {
                return (
                    <ObjectGroup
                        key={item}
                        objectType={item}
                        handleOpenObjectModal={handleOpenObjectModal}
                        handleOpenDeleteObjectModal={
                            handleOpenDeleteObjectModal
                        }
                        handleOpenMonitorModal={handleOpenMonitorModal}
                        handleOpenStyModal={handleOpenStyModal}
                        objectLists={monitoringObjects.filter(
                            list => list.category === item
                        )}
                    />
                );
            })}
            {/* Object Modal */}
            {objectModalProps.optType && (
                <ObjectModal
                    open={objectModal}
                    closeModal={handleCloseObjectModal}
                    modalProps={objectModalProps}
                    getAndUpdateObjectLists={getAndUpdateObjectLists}
                />
            )}
            {/* Modals */}
            {deleteModalProps.objectId && (
                <ObjectDeleteModal
                    open={objectDeleteModal}
                    closeModal={handleCloseDeleteObjectModal}
                    deleteModalProps={deleteModalProps}
                    getAndUpdateObjectLists={getAndUpdateObjectLists}
                />
            )}
            <MonitorModal
                open={objectMonitorModal}
                closeModal={closeObjectMonitorModal}
            />
            {strategyModalProps.objectId && (
                <SelectStrategyModal
                    open={objectStyModal}
                    closeModal={handleCloseStyModal}
                    strategyModalProps={strategyModalProps}
                    getAndUpdateObjectLists={getAndUpdateObjectLists}
                />
            )}
        </div>
    );
}

export default ObjectMonitor;
