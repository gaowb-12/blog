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

export default function Register() {
  const router = useRouter()
  // login逻辑
  async function register(values:any){
    try {
      let data = await http_auth.register({name:values.name,password:values.password})
      message.success("注册成功，请登录！")
      router.push("/login")
    } catch (error) {
      console.log(error)
    }
  }

  const onFinish = (values:string) => {
    register(values)
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

            <Form.Item
              name="vertifyPwd"
              rules={[
                {
                  required: true,
                  message: '请确认密码!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('两次输入的密码不匹配!');
                  },
                }),
              ]}
            >
              <Input.Password size="large" placeholder="确认密码" />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" size="large" block htmlType="submit">
                提交
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
