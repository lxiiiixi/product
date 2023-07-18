import ObjectGroupHead from './ObjectGroupHead';
import { ObjectType, ObjectInfo } from '@/config/commonInterface';
import { Row, Col, message } from 'antd';
import MonitorObjectCard from './MonitorObjectCard';
import FPAddCard from '@/components/FPAddCard';

function ObjectGroup({
    objectType,
    objectLists,
    handleOpenObjectModal,
    handleOpenDeleteObjectModal,
    handleOpenMonitorModal,
    handleOpenStyModal
}: {
    objectType: ObjectType;
    objectLists: ObjectInfo[];
    handleOpenObjectModal: (
        optType: 'Add' | 'Edit',
        objectType: ObjectType,
        editObjectData: null | ObjectInfo
    ) => void;
    handleOpenDeleteObjectModal: (objectId: string, objectName: string) => void;
    handleOpenMonitorModal: () => void;
    handleOpenStyModal: (objectId: string, strategy: string | null) => void;
}) {
    const handleEditobjectModal = (data: ObjectInfo) => {
        handleOpenObjectModal('Edit', objectType, data);
    };
    return (
        <div className="objects my-2">
            <ObjectGroupHead objectType={objectType} />
            <Row gutter={[18, 18]}>
                {objectLists.map(item => (
                    <Col xs={24} sm={24} md={12} lg={12} key={item._id.$oid}>
                        <MonitorObjectCard
                            objectData={item}
                            handleOpenDeleteObjectModal={
                                handleOpenDeleteObjectModal
                            }
                            handleEditobjectModal={handleEditobjectModal}
                            handleOpenMonitorModal={handleOpenMonitorModal}
                            handleOpenStyModal={handleOpenStyModal}
                        />
                    </Col>
                ))}
                <Col xs={24} sm={24} md={12} lg={12} className="h-[250px]">
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
