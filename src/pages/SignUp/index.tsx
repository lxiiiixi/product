import { Form, Input, Button, Card, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

import API from '@/api';
interface LoginForm {
    nick_name: string;
    email: string;
    password: string;
}

function SignUp() {
    const navigate = useNavigate();

    const onFinish = (values: LoginForm) => {
        console.log(values);
        API.UserApi.register(values)
            .then(res => {
                navigate('./login');
                message.success('Registered successfully!');
            })
            .catch(err => {
                console.log('error', err);
                if (err.response.data.code === 400) {
                    message.error(err.response.data.message);
                }
            });
    };

    return (
        <div className="w-full h-full flex-center py-8">
            <Card
                title={<div className="text-center">SIGN UP</div>}
                bordered={false}
                style={{ width: 500 }}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="nick_name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input a name!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!'
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Space className="flex-center">
                        <Button onClick={() => navigate('../login')}>
                            Sign in
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Sign up
                        </Button>
                    </Space>
                </Form>
            </Card>
        </div>
    );
}

export default SignUp;
