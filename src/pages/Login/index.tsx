import { useEffect } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import useUserInfoStore from '@/store/userInfoStore';

import API from '@/api';
interface LoginForm {
    email: string;
    password: string;
}

function Login() {
    const navigate = useNavigate();
    const setUserInfo = useUserInfoStore(state => state.setUserInfo);

    const getAndStoreUserInfo = () => {
        API.UserApi.getUserInfo()
            .then(res => {
                const { nick_name, email } = res.data;
                setUserInfo(nick_name, email);
                // 已经是登陆状态 不需要再登陆了  =>  直接跳到dashboard告诉用户已经登陆  =>  或者退出登陆才可以
                navigate('/dashboard');
            })
            .catch(err => {
                // 请求错误说明当前用户没有登陆
                console.log(err);
            });
    };

    useEffect(() => {
        getAndStoreUserInfo();
    }, []);

    const onFinish = (values: LoginForm) => {
        API.UserApi.login(values)
            .then(res => {
                // navigate('/dashboard');
                getAndStoreUserInfo();
                message.success('Login successfully!');
                // Waiting: index.tsx?t=1689577555971:46 Warning: [antd: message] Static function can not consume context like dynamic theme. Please use 'App' component instead.
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
