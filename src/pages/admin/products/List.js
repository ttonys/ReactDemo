import React, {useEffect, useState} from 'react';
import {Button, Card, Table, Popconfirm, message} from "antd";
import {listApi} from "../../../services/products";


function List(props) {
    const [dataSource, setDataSource] = useState()
    const [total, setTotal] = useState(0)

    useEffect(() => {
        listApi().then(res => {
            if (res.code === "0000") {
                setDataSource(res.data)
                setTotal(res.total)
            }else{
                message.warning(res.desc).then(res => {})
            }
        }).catch(() => {
            message.error("接口数据请求失败").then(res => {})
        })
    }, []);


    const columns = [{
        title: '序号',
        key: 'id',
        width: 80,
        align: 'center',
        render: (text, record, index) => {
            return (
                index + 1
            )
        }
    },{
        title: '名字',
        dataIndex: 'name',

    }, {
        title: '价格',
        dataIndex: 'price'
    }, {
        title: '操作',
        render: (text, record, index) => {
            return (
                <div>
                    <Button size="small" type="primary">修改</Button>
                    <Popconfirm
                        title="确定删除此项？"
                        onCancel={() => {console.log('用户取消删除')}}
                        onConfirm={() => {console.log('用户确认删除')}}>
                        <Button size="small" type="danger" style={{margin: '0 1rem'}}>删除</Button>
                    </Popconfirm>
                </div>
            )
        }
    }]
    return (
        <Card
            title="商品列表"
            extra={<Button type="primary" size="small" onClick={() => {props.history.push('/admin/products/edit')}}>新增</Button>}>
            <Table
                rowKey='id'
                columns={columns}
                pagination={{total, defaultPageSize: 5}}
                bordered
                dataSource={dataSource}
            />
        </Card>
    );
}

export default List;