import  express  = require('express')
import { genToken } from '../middlewares/auth'
import { findSome } from '../models'
import getHash from "../middlewares/crypto"
import {formatTime} from "../middlewares/time"

// 注册逻辑
export async function SignUp(req:express.Request, res:express.Response){
    let user = req.body
    
    // 1. 首先查询数据库是否已经有注册过
    let result = await findSome(`SELECT * FROM blog_user WHERE user_name='${user.name}'`)
    // 2. 查到结果提示注册过
    if(result)
        res.status(801).json({body:null,errcode:801,message:"用户名已注册！"})
    // 3. 未查到结果直接注册
    else{
        let insert_time = formatTime(new Date())
        let hashPwd = getHash(user.password)
        let result = await findSome(`INSERT INTO blog_user(id,user_name,pwd,insert_time) VALUES(0,'${user.name}','${hashPwd}','${insert_time}')`)
        if(result)
            res.status(200).json({body:{username:user.name,insert_time:insert_time},errcode:200,message:"用户名注册成功！"})
        else
            res.status(501).json({body:null,errcode:501,message:"用户名注册失败，请重试！"})
    }
}

// 登录逻辑
export async function Login(req:express.Request, res:express.Response){
    let user = req.body
    // 1. 查询是否存在当前用户
    let result = await findSome(`SELECT * FROM blog_user WHERE user_name='${user.name}'`)
    
    if(!result||result.length<=0) 
        res.status(800).json({body:null,errcode:800,message:"账号或密码错误！"})
    else{
        // 2. 校验密码
        let hashPwd = getHash(user.password)
        if(hashPwd == result[0].pwd){
            let token = genToken({username:user.name})
            res.status(200).json({body:{token,username:user.name},errcode:200,message:"登录成功！"})
        }
        else 
            res.status(800).json({body:null,errcode:800,message:"账号或密码错误！"})
    }
}

// 退出逻辑
export async function Logout(req:express.Request, res:express.Response){
    
}
