import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default function layout(props:React.Props<any>) {
    // 声明一个叫 "user" 的 state 变量
    const [user, setUser]:[any,any] = useState("");
    useEffect(() => {
        // 将条件判断放置在 effect 中
        if (user == '') {
            setUser(JSON.parse(localStorage.getItem("user")||"{}"));
        }
    });
    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background:"#fff",boxShadow:"rgb(235 234 234) 0px 0px 3px 2px" }}>
                <h2 className="logo">管理后台</h2>
                <div style={{position: 'absolute',right:"30px",top:"0"}}>
                    <div className="top-item">
                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /> 
                        &nbsp; Hi，{user.username}
                    </div>
                </div>
            </Header>
            <Layout>
                <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    paddingTop: 64, 
                    boxSizing:"border-box",
                    background:"#fff",
                    left: 0,
                }}
                >
                <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        所有文章
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />}>
                        分类管理
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UserOutlined />}>
                        标签管理
                    </Menu.Item>
                    <Menu.Item key="4" icon={<UserOutlined />}>
                        所有页面
                    </Menu.Item>
                    <Menu.Item key="5" icon={<UserOutlined />}>
                        评论管理
                    </Menu.Item>
                    <Menu.Item key="6" icon={<UserOutlined />}>
                        邮件管理
                    </Menu.Item>
                    <Menu.Item key="7" icon={<UserOutlined />}>
                        文件管理
                    </Menu.Item>
                    <Menu.Item key="8" icon={<UserOutlined />}>
                        访问统计
                    </Menu.Item>
                    <Menu.Item key="9" icon={<UserOutlined />}>
                        用户管理
                    </Menu.Item>
                    <Menu.Item key="10" icon={<UserOutlined />}>
                        系统设置
                    </Menu.Item>
                    {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu> */}
                    
                </Menu>
                </Sider>
                <Layout style={{ marginLeft: 200,height: "100vh" }}>
                <Content style={{ padding: '0 50px',paddingTop: 64, overflowY: 'auto' }}>
                    <div className="site-layout-background" style={{ background:"#fff",marginTop:"20px",minHeight:"60%", textAlign: 'center' }}>
                        {props.children}
                    </div>
                </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}