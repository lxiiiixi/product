import { Button, Form, Input, Space } from 'antd';
import BasicModal from '@/components/BasicModal';
import FPInput from '@/components/FPInput';

interface ContactUsFormModalProps {
  open: boolean;
  closeModal: () => void;
}

interface ContactUsFormProps {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  discription: string;
}

export default function ContactUsFormModal({
  open,
  closeModal
}: ContactUsFormModalProps) {
  const [form] = Form.useForm();

  const onFinish = (item: ContactUsFormProps) => {
    console.log(item);
    closeModal();
  };

  return (
    <BasicModal
      open={open}
      closeModal={closeModal}
      title="Contact Us"
      footer={null}
    >
      <Form
        form={form}
        id="contactUs_form"
        layout="vertical"
        name="fp_quite_form"
        onFinish={onFinish}
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true }]}
        >
          <FPInput />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true }]}
        >
          <FPInput />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <FPInput />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country/region"
          rules={[{ required: true }]}
        >
          <FPInput />
        </Form.Item>
        <Form.Item
          name="discription"
          label="Discription of your needs."
          rules={[{ required: true }]}
        >
          <FPInput />
        </Form.Item>
        <Form.Item className="mt-4 w-full flex justify-center items-center">
          <Space size="middle">
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Confirm
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </BasicModal>
  );
}
