import React, {useEffect} from 'react';
import {Button, Card, Form, Input, message} from "antd";
import {createApi, getOneByIdApi, modifyOneApi} from "../../../services/products";

function Edit(props) {
    const [form] = Form.useForm();

    useEffect(() => {
        console.log(props)
        if (props.match.params.id) {
            getOneByIdApi(props.match.params.id)
                .then(res => {
                    form.setFieldsValue({"name": res.data.name, "price": res.data.price})
                });
        }
    }, [])

    const onFinish = (values: any) => {
        if(props.match.params.id){
            // 修改数据
            modifyOneApi(props.match.params.id, {
                name: values.name,
                price: values.price
            }).then(r => {
                message.info(r.desc).then(r => {
                })
            })
                .catch(message.warning("修改失败，接口暂不支持"))
            console.log('Success:', values);

        }else{
            // 新增数据
            createApi( {
                name: values.name,
                price: values.price
            }).then(r => {
                message.info(r.desc).then(r => {
                })
            })
                .catch(message.warning("新增失败，接口暂不支持"))
            console.log('Success:', values);
        }

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
                form={form}
            >
                <Form.Item label="名字" name="name" required
                           rules={[{required: true, message: 'Please input your username!'}]}>
                    <Input placeholder="请输入商品名字"/>
                </Form.Item>
                <Form.Item label="价格" name="price" required
                           rules={[{required: true, message: 'Please input your username!'}]}>
                    <Input placeholder="请输入商品价格"/>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default Edit;