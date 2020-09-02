import { Button ,Input  } from 'antd';
import { UserOutlined ,KeyOutlined } from '@ant-design/icons';
import styles from "./Login.module.scss";

export default function Home() {
  let state = {
    name: '',
    password:''
  };
  return (
      <main className={styles["main-container"]}>
        <div className={styles["login-container"]}>
          <h2 className={styles["login-tip"]}>系统登录</h2>
          <div className={styles["item"]}><Input size="large" placeholder="用户名" prefix={<UserOutlined />} /></div>
          <div className={styles["item"]}><Input.Password size="large" placeholder="密码" prefix={<KeyOutlined />} /></div>
          <div className={styles["item"]}> <Button type="primary" size="large" block>登录</Button></div>
          or <span>用户注册</span>
        </div>
      </main>
  )
}
