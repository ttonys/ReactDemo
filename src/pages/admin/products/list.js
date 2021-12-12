import React, {useEffect} from 'react';
import {Button, Card, Table, Popconfirm, message} from "antd";
import {delOneApi, modifyOneApi} from "../../../services/products";
import {connect} from "react-redux";
import loadProduct from "../../../store/actions/products";


function List(props) {
    console.log(props)
    const {data, total} = props
    useEffect(() => {
        props.dispatch(loadProduct())
        console.log("Hook-Effect-List-Page")
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
    }, {
        title: '名字',
        dataIndex: 'name',

    }, {
        title: '价格',
        dataIndex: 'price'
    }, {
        title: '是否在售',
        dataIndex: 'onSale',
        render: (text, record, index) => {
            return (
                record.onSale ? "在售" : "已下架"
            )
        }
    }, {
        title: '操作',
        render: (text, record, index) => {
            return (
                <div>
                    <Button size="small" type="primary" onClick={() => {
                        props.history.push(`/admin/products/edit/${record.id}`)
                    }}>修改</Button>
                    <Popconfirm
                        title="确定删除此项？"
                        onCancel={() => {
                            console.log('用户取消删除')
                        }}
                        onConfirm={() => {
                            delOneApi(record.id)
                                .then(r => {
                                    message.warning(r.desc).then(r => {
                                    })
                                    message.info("删除接口未实现，请根据实际项目补充").then(r => {
                                    })
                                })
                        }
                        }>
                        <Button size="small" type="danger" style={{margin: '0 1rem'}}>删除</Button>
                    </Popconfirm>
                    <Button size="small" onClick={() => {
                        modifyOneApi(record.id, {onSale: !record.onSale}).then(res => {
                            message.warning(res.desc).then(res => {
                            })
                            message.info("修改接口未实现，请根据实际项目补充").then(r => {
                            })
                        })
                    }}>{record.onSale ? "下架" : "上架"}</Button>
                </div>
            )
        }
}]
return (
    <Card
        title="商品列表"
        extra={<Button type="primary" size="small" onClick={() => {
            props.history.push('/admin/products/edit')
        }}>新增</Button>}>
        <Table
            rowKey='id'
            columns={columns}
            pagination={{total, defaultPageSize: 5}}
            bordered
            dataSource={data}
        />
    </Card>
);
}

export default connect(state=> state.products)(List);