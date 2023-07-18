import FPBasicModal from '@/components/FPBasicModal';
import { Form, Checkbox, Space, Button } from 'antd';

const ObjectDeleteModal = ({
    open,
    closeModal
} // confirmDeleteObject
: {
    open: boolean;
    closeModal: () => void;
    // confirmDeleteObject: () => void;
}) => {
    return (
        <FPBasicModal
            title="Delete the object"
            width={400}
            open={open}
            closeModal={closeModal}
            footer={null}
        >
            {/* <div className="flex-center"> */}
            <div className="text-center my-4">
                Are you sure to delete the object?
            </div>
            <Space size="middle" className="flex-center my-3">
                <Button onClick={closeModal}>Cancel</Button>
                <Button
                    type="primary"
                    //  onClick={confirmDeleteObject}
                >
                    Delete
                </Button>
            </Space>
            {/* </div> */}
        </FPBasicModal>
    );
};

export default ObjectDeleteModal;
