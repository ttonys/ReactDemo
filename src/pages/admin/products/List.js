import React, {useEffect, useState} from 'react';
import {Button, Card, Table, Popconfirm, message} from "antd";
import {delOneApi, listApi, modifyOneApi} from "../../../services/products";


function List(props) {
    const [dataSource, setDataSource] = useState()
    const [total, setTotal] = useState(0)

    useEffect(() => {
        console.log("Hook-Effect-List-Page")
        loadData()
    }, []);

    const loadData = () => {
        console.log("Load-Data-List-Page")
        listApi().then(res => {
            if (res.code === "0000") {
                setDataSource(res.data)
                setTotal(res.total)
            } else {
                message.warning(res.desc).then(res => {
                })
            }
        }).catch(() => {
            message.error("接口数据请求失败").then(res => {
            })
        })
    }

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
                                    // 触发重新渲染
                                    loadData()
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
                            // 触发重新渲染
                            loadData()
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
            dataSource={dataSource}
        />
    </Card>
);
}

export default List;