import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import http_auth from "../../src/api/auth";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default function Home() {
  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background:"#fff" }}>
        <h2 className="logo">管理后台</h2>
        {/* <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu> */}
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
              nav 1
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200,height: "100vh" }}>
          <Content style={{ padding: '0 50px',paddingTop: 64, overflowY: 'auto' }}>
            <div className="site-layout-background" style={{ background:"#fff",marginTop:"20px",minHeight:"60%", textAlign: 'center' }}>
              content
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}