import React from 'react';
import {Button, Card, Form, Input, message} from "antd";

function Edit(props) {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    const onFinishFailed = () => {
        message.error("请输入正确内容").then(r => console.log(r))
    };
    return (
        <Card title="商品编辑">
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
            >
                <Form.Item label="名字"  name="name" required rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input placeholder="请输入商品名字" />
                </Form.Item>
                <Form.Item label="价格"  name="price" required rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input placeholder="请输入商品价格" />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default Edit;