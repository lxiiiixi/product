import { Modal,ModalProps } from 'antd';


interface BasicModalProps extends ModalProps {
    title: string;
    open: boolean;
    closeModal: () => void;
    onOk?: () => void;
    width?: number;
    footer?: React.ReactNode;
    children: React.ReactNode;
  }

  
export default function BasicModal({ title, open, closeModal, onOk, width = 600, footer, children, ...props }:BasicModalProps) {

    const Title = <div className="text-white bg-object-token rounded-t-2xl px-5 py-1"><h3>{title}</h3></div>

    return (
        <Modal
            open={open}
            onCancel={closeModal}
            onOk={onOk}
            title={Title}
            footer={footer}
            closable={false}
            width={width}
            {...props}
        >
            <div className="px-5 py-2">
                {children}
            </div>
        </Modal>
    )
}