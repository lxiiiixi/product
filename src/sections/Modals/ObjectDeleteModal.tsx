import FPBasicModal from '@/components/FPBasicModal';
import { Space, Button, message } from 'antd';
import { DeleteObjectModalProps } from '@/pages/ObjectMonitor';
import API from '@/api';

const ObjectDeleteModal = ({
    open,
    closeModal,
    deleteModalProps,
    getAndUpdateObjectLists
}: {
    open: boolean;
    closeModal: () => void;
    deleteModalProps: DeleteObjectModalProps;
    getAndUpdateObjectLists: () => void;
}) => {
    const { objectId, objectName } = deleteModalProps;

    const handleDelete = () => {
        API.ObjApi.deleteAnObject(objectId as string)
            .then(res => {
                message.success('Success!');
                getAndUpdateObjectLists();
                closeModal();
            })
            .catch(err => {
                message.error(err.response.data.message);
            });
        // getAndUpdateObjectLists()
    };

    return (
        <FPBasicModal
            title="Delete the object"
            width={400}
            open={open}
            closeModal={closeModal}
            footer={null}
        >
            <div className="text-center my-4">
                Are you sure to delete {objectName}?
            </div>
            <Space size="middle" className="flex-center my-7">
                <Button onClick={closeModal}>Cancel</Button>
                <Button type="primary" onClick={handleDelete}>
                    Delete
                </Button>
            </Space>
            {/* </div> */}
        </FPBasicModal>
    );
};

export default ObjectDeleteModal;
