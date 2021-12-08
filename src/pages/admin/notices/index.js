import React from 'react';
import {useState} from "react";
import {Card, List, Avatar, Button} from "antd";
import {connect} from "react-redux";

function Index(props) {
    const [isDisable, setIsDisable] = useState(false);
    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];

    return (
        <Card title="通知中心" extra={<Button size="small" disabled={isDisable} danger onClick={() => {
            setIsDisable(true)
            props.dispatch({
                type: "READ_ALL"
            })
        }}>全部已读</Button>}>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
}

export default connect(state => state)(Index);