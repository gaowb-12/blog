import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import styles from "./Login.module.scss";
import http_auth from "../../src/api/auth";

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

export default function Home() {
  const router = useRouter()
  // login逻辑
  async function login(values:any){
    try {
      let data = await http_auth.login({name:values.name,password:values.password})
      // 本地存储token
      localStorage.setItem("token",data.token)
      router.push("/")

    } catch (error) {
      console.log(error)
    }
  }

  const onFinish = (values:string) => {
    login(values)
  };

  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };
  return (
      <main className={styles["main-container"]}>
        <div className={styles["login-container"]}>
          <h2 className={styles["login-tip"]}>系统登录</h2>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: '请输入用户名！' }]}
            >
              <Input size="large" placeholder="用户名" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码！' }]}
            >
              <Input.Password size="large" placeholder="密码" />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" size="large" block htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
          <Link href="/register">
            <a>去注册</a>
          </Link>
        </div>
      </main>
  )
}
