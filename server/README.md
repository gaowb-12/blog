# Blog

## 架构搭建 
```
client 博客首页相关代码
src
  │   server.ts       # 入口，服务启动
  └───route           # Express route controllers for all the endpoints of the app
  └───config          # 环境变量和配置相关
  └───jobs            # 对于 agenda.js 的任务调度定义
  └───loaders         # 将启动过程拆分为模块
  └───models          # 数据库模型
  └───services        # 所有的业务逻辑应该在这里
  └───subscribers     # 异步任务的事件处理程序
  └───types           # 对于 Typescript 的类型声明文件（d.ts）
```

## 环境搭建 
#### 基础环境 
```
node npm 
express：node服务端开发框架
typescript : TS依赖
nextjs：SSR（服务端渲染）基础框架
```

#### 开发环境 
```
cross-env：可以跨平台设置系统环境变量
nodemon：监控js/ts文件变化，实时更新node服务
ts-node：支持node直接运行ts文件
```

## 安装依赖 
```
npm install
```

## 开发环境编译并启动项目

#### Next.js脚手架方式启动
```
npm run dev 快速启动nextjs项目
npm run build 打包nextjs项目
npm run start 运行打包之后的nextjs项目
```

#### 自定义服务器启动
```
npm run node_dev 通过express自定义服务器的方式启动nextjs前端项目（运行之前，必须经过npm run build）

npm run node_build 打包服务端项目（可直接部署）
```