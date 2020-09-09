import http_auth from "../../src/api/auth";
import React, { useState } from 'react';
import { Form, Input, Button, Select, Table, Tag, Space } from 'antd';
import MainPage from "../../src/components/MainPage"

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const columns = [
  {
    title: '标题',
    dataIndex: 'name',
    key: 'name',
    render: (text:any) => <a>{text}</a>,
  },
  {
    title: '状态',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '分类',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags:any) => (
      <>
        {tags.map((tag:any) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '阅读量',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '发布时间',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '操作',
    key: 'action',
    render: (text:any, record:any) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

export default function Article() {
  const [form] = Form.useForm();
  
  let onFinish = (values:string) => {
    console.log(values);
  };
  return (
    <MainPage>
      <Form
        layout={"inline"}
        form={form}
        initialValues={{ layout: "inline" }}
        onFinish={onFinish}
      >
        <Form.Item label="标题" name="title">
          <Input placeholder="标题" style={{minWidth:"188px"}}/>
        </Form.Item>
        <Form.Item label="状态" name="status">
          <Select placeholder="状态" style={{minWidth:"188px"}}>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="分类" name="catalogue">
          <Select placeholder="分类" style={{minWidth:"188px"}}>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">搜索</Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={data} />
    </MainPage>
  )
}