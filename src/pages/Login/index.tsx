import { Form, Input, Button, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import API from '@/api';
interface LoginForm {
    email: string;
    password: string;
}

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        API.UserApi.getUserInfo()
            .then(res => {
                // 已经是登陆状态 不需要再登陆了  =>  是否要直接跳到dashboard告诉用户已经登陆
                console.log(res);
                navigate('/dashboard');
            })
            .catch(err => {
                // 请求错误说明当前用户没有登陆
                console.log(err);
            });
    }, []);

    const onFinish = (values: LoginForm) => {
        API.UserApi.login(values)
            .then(res => {
                console.log(res.data.access_token);
                navigate('/dashboard');
                message.success('Login successfully!');
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
            <Card title="Sign In" bordered={false} style={{ width: 500 }}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{
                        email: 'example@gamilc.com',
                        password: 'password'
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
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

                    {/* <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

                    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full"
                        >
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default Login;
