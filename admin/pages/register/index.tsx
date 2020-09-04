import Link from 'next/link'
import React, { useState } from 'react';
import { Button ,Input  } from 'antd';
import { UserOutlined ,KeyOutlined } from '@ant-design/icons';
import styles from "./Login.module.scss";
import http_auth from "../../src/api/auth";

export default function Home() {
  // 增加用户名 密码
  let [name,setName] = useState("")
  let [password,setPassword] = useState("")
  let [vertifyPwd,setVertifyPwd] = useState("")

  // login逻辑
  async function register(){
    try {
      let data = await http_auth.login({name,password})
      // 本地存储token
      localStorage.setItem("token",data.body.token)

    } catch (error) {
      console.log(error)
    }
  }
  // 用户名
  function handleChange(event:any) {
    setName(event.target.value);
  }
  // 密码
  function handleChangepassword(event:any) {
    setPassword(event.target.value);
  }
  // 确认密码
  function vertifyPassword(event:any) {
    setVertifyPwd(event.target.value);
  }
  return (
      <main className={styles["main-container"]}>
        <div className={styles["login-container"]}>
          <h2 className={styles["login-tip"]}>用户注册</h2>
          <Input 
            size="large" 
            placeholder="用户名" 
            className={styles["item"]} 
            value={name} 
            onChange={handleChange} 
            prefix={<UserOutlined />} />
          <Input.Password 
            size="large" 
            placeholder="密码" 
            className={styles["item"]} 
            value={password} 
            onChange={handleChangepassword} 
            prefix={<KeyOutlined />}/>
          <Input.Password 
            size="large" 
            placeholder="确认密码" 
            className={styles["item"]} 
            value={vertifyPwd} 
            onChange={vertifyPassword} 
            prefix={<KeyOutlined />} />
          <Button type="primary" size="large" className={styles["item"]} block onClick={register}>登录</Button>
          <Link href="/login">
            <a>去登录</a>
          </Link>
        </div>
      </main>
  )
}
