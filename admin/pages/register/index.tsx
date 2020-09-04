import Link from 'next/link'
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined ,KeyOutlined } from '@ant-design/icons';
import styles from "./Login.module.scss";
import http_auth from "../../src/api/auth";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

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
  const onFinish = (values:string) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };
  return (
      <main className={styles["main-container"]}>
        <div className={styles["login-container"]}>
          <h2 className={styles["login-tip"]}>用户注册</h2>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" size="large" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Link href="/login">
            <a>去登录</a>
          </Link>
        </div>
      </main>
  )
}
