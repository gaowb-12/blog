import Link from 'next/link'
import React, { useState } from 'react';
import { Button ,Input  } from 'antd';
import { UserOutlined ,KeyOutlined } from '@ant-design/icons';
import styles from "./Login.module.scss";
import http_auth from "../../src/api/auth";

export default function Home() {
  // 初始化用户名 密码
  let [name,setName] = useState("")
  let [password,setPassword] = useState("")

  // login逻辑
  function login(){
    http_auth.login({name,password})
    .then(res=>{
      console.log(res)
    })
  }
  function handleChange(event:any) {
    console.log(event.target.value)
    setName(event.target.value);
  }
  function handleChangepassword(event:any) {
    setPassword(event.target.value);
  }
  return (
      <main className={styles["main-container"]}>
        <div className={styles["login-container"]}>
          <h2 className={styles["login-tip"]}>系统登录</h2>
          <div className={styles["item"]}>
            <Input size="large" placeholder="用户名" value={name} onChange={handleChange} prefix={<UserOutlined />} />
          </div>
          <div className={styles["item"]}>
            <Input.Password size="large" placeholder="密码" value={password} onChange={handleChangepassword} prefix={<KeyOutlined />} />
          </div>
          <div className={styles["item"]}> 
            <Button type="primary" size="large" block onClick={login}>登录</Button>
          </div>
          <Link href="/register">
            <a>用户注册</a>
          </Link>
        </div>
      </main>
  )
}
