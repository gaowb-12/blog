import React, { useState } from 'react';
import { Form, Input, Button, Select, Table, Tag, Space,message } from 'antd';
import fetch from "isomorphic-unfetch";
import http_article from "../../src/api/article";
import MainPage from "../../src/components/MainPage"

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    render: (text:any) => <a>{text}</a>,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '分类',
    dataIndex: 'catalogue',
    key: 'catalogue',
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
    dataIndex: 'readnum',
    key: 'readnum',
  },
  {
    title: '发布时间',
    dataIndex: 'publishTime',
    key: 'publishTime',
  },
  {
    title: '操作',
    key: 'action',
    render: (text:any, record:any) => (
      <Space size="middle">
        <a>查看访问</a>
        <a>编辑</a>
        <a>删除</a>
      </Space>
    ),
  },
];

function Article() {
  const [form] = Form.useForm();
  const [data,setData]:[Array<any>,Function] = useState([]);
  let flag = false;
  // 获取文章列表
  async function getArticleList(values:any){
    flag=true
    try {
      let data = await http_article.getArticleList({title:values.title,catalogue:values.catalogue,status:values.status})
      setData(data.result)
    } catch (error) {
      console.log(error)
    }
    flag=false
  }

  let onFinish = (values:string) => {
    if(flag){
      message.warning("操作太频繁，请稍后再试！")
      return
    }
    getArticleList(values)
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

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const res = await fetch('https://.../posts')
//   const posts = await res.json()

//   // By returning { props: posts }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       posts,
//     },
//   }
// }

export default Article