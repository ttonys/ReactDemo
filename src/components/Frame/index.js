import React from 'react';
import {Layout, Menu, Dropdown, message} from 'antd';
import logo from './logo.png'
import {adminRoutes} from "../../routes";
import {withRouter} from 'react-router-dom'
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import './frame.css';
import {removeToken} from "../../utils/auth";

const { Header, Content, Sider } = Layout;
const routes = adminRoutes.filter(route=>route.isShow)


function Index(props) {
    console.log(props)
    const menu = (
        <Menu
            onClick={(p) => {
                if(p.key === "logout" ){
                    removeToken()
                    props.history.push("/login")
                }else{
                    message.info(p.key).then(r => console.log(r))
                }
            }}
        >
            <Menu.Item key="notice">
                通知中心
            </Menu.Item>
            <Menu.Item key="setting">
                设置
            </Menu.Item>
            <Menu.Item key="logout" danger>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout>
            <Header className="header" style={{
                backgroundColor: '#57A9FB'
            }}>
                <div className="logo">
                    <img src={logo} alt='logo' height={50} width={50}/>
                </div>
                <Dropdown icon={<UserOutlined />} overlay={menu}>
                    <div className="header-dropdown">
                        <span>超级管理员<DownOutlined /></span>
                    </div>
                </Dropdown>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        {routes.map(route => {
                            return (
                                <Menu.Item
                                    key={route.path}
                                    icon={route.icon}
                                    onClick={p => props.history.push(p.key)}
                                >
                                    {route.title}
                                </Menu.Item>
                            )
                        })}
                    </Menu>
                </Sider>
                <Layout style={{ padding: '16px' }}>
                    {/*<Breadcrumb style={{ margin: '16px 0' }}>*/}
                    {/*    <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>App</Breadcrumb.Item>*/}
                    {/*</Breadcrumb>*/}
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default withRouter(Index);