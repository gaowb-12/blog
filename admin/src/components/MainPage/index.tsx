import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

export default function layout(props:React.Props<any>) {
    return (
        <Layout style={{background:"#fff"}}>
            {/* <Header style={{background:"#fff", padding: '0'}}>
                {props.children}
            </Header> */}
            <Content style={{ padding: '0' }}>
                {props.children}
            </Content>
        </Layout>
      )
}