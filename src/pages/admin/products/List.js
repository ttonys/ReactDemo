import React from 'react';
import {Button, Card, Table, Popconfirm} from "antd";

const dataSource = [{
    id: 1,
    name: '香皂',
    price: 5
}, {
    id: 2,
    name: '电池',
    price: 10
}, {
    id: 3,
    name: '牛奶',
    price: 50
}]

function List(props) {
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
                bordered
                dataSource={dataSource}
            />
        </Card>
    );
}

export default List;