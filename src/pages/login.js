import React from 'react';
import {Form, Input, Button, Checkbox, Card, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {setToken} from "../utils/auth";
import './login.css'
import {loginApi} from "../services/auth";


function Login(props) {
    const onFinish = (values: any) => {
        loginApi({
            username: values.username,
            password: values.password
        }).then(res => {
            if (res.code === "0000" && res.data.verifySuccess){
                console.log(res)
                message.success("登录成功").then(r => {})
                setToken(res.data.userInfo.token);
                props.history.push("/admin")
            }else{
                console.log(res)
                message.warning("登录失败，用户名或密码错误").then(r => {})
                message.info("用户名admin,密码123456").then(r => {})
            }
        }).catch(err => {
            console.log(err)
            message.error("网络错误").then(r => {})
        })
        // setToken(values.username);
        // console.log('Received values of form: ', values);
        // props.history.push("/admin")
    };

    return (
        <Card
            title="登录后台"
            className="login-card"
        >
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default Login;