import React, {useEffect} from 'react';
import {Button, Card, Form, Input, message, Upload} from "antd";
import { UploadOutlined } from '@ant-design/icons';
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

    const uploadProps = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                message.error("请根据实际地地址配置上传路径").then(r => {})
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`).then(r => {});
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`).then(r => {});
            }
        },
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
                <Form.Item label="图片上传">
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType="submit">保存</Button>
                </Form.Item>

            </Form>
        </Card>
    );
}

export default Edit;