/// <reference types="../types/global" />

import  express  = require('express')
import  expressLoader  from './express'
import  mysqlLoader  from './mysql'
import  Logger  from './logger'

// 添加全局日志方法
global.Logger = Logger;

export default async ({exporessApp}:{exporessApp:express.Application}) => {
    // 注册路由
    await expressLoader({app:exporessApp})
    Logger.info('Express loaded');
    
    // 启动mysql
    await mysqlLoader()
    Logger.info('mysql loaded');
}