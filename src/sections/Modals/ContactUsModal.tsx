import { Button, Form, Input, Space } from 'antd';
import BasicModal from "@/components/BasicModal";


export default function ContactUsFormModal({ open, closeModal }) {
    const [form] = Form.useForm();

    const onFinish = (item) => {
        console.log(item);
        closeModal()
    }

    return (
        <BasicModal open={open} closeModal={closeModal} title="Contact Us" footer={null}>
            <Form form={form} id="contactUs_form" layout="vertical" name="fp_quite_form" onFinish={onFinish} >
                <Form.Item name='firstName' label="First Name" rules={[{ required: true }]}>
                    <Input className=" border-none bg-gray-200 p-1 pl-2" />
                </Form.Item>
                <Form.Item name='lastName' label="Last Name" rules={[{ required: true }]}>
                    <Input className=" border-none bg-gray-200 p-1 pl-2" />
                </Form.Item>
                <Form.Item name='email' label="Email" rules={[{ required: true }]}>
                    <Input className=" border-none bg-gray-200 p-1 pl-2" />
                </Form.Item>
                <Form.Item name='Country' label="country/region" rules={[{ required: true }]}>
                    <Input className=" border-none bg-gray-200 p-1 pl-2" />
                </Form.Item>
                <Form.Item name='discription' label="Discription of your needs." rules={[{ required: true }]}>
                    <Input className=" border-none bg-gray-200 p-1 pl-2" />
                </Form.Item>
                <Form.Item className="mt-4 w-full flex justify-center items-center">
                    <Space size="middle">
                        <Button onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Confirm
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </BasicModal>
    )
}