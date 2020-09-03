import Link from 'next/link'
import { Button ,Input  } from 'antd';
import { UserOutlined ,KeyOutlined } from '@ant-design/icons';
import styles from "./Login.module.scss";
import http_auth from "../../src/api/auth";

export default function Home() {
  let state = {
    name: '',
    password:''
  };
  function login(){
    console.log("login")
    http_auth.login({name:"test1",password:"123456"})
    .then(res=>{
      console.log(res)
    })
  }
  return (
      <main className={styles["main-container"]}>
        <div className={styles["login-container"]}>
          <h2 className={styles["login-tip"]}>系统登录</h2>
          <div className={styles["item"]}><Input size="large" placeholder="用户名" prefix={<UserOutlined />} /></div>
          <div className={styles["item"]}><Input.Password size="large" placeholder="密码" prefix={<KeyOutlined />} /></div>
          <div className={styles["item"]}> <Button type="primary" size="large" block onClick={login}>登录</Button></div>
          <Link href="/register">
            <a>用户注册</a>
          </Link>
        </div>
      </main>
  )
}
