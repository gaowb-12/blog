import  express  = require('express')
import { genToken } from '../middlewares/auth'
import { findSome } from '../models'

// 注册逻辑
export async function SignUp(req:express.Request, res:express.Response){
    let user = req.body
    
    // 1. 首先查询数据库是否已经有注册过
    let result = await findSome(`SELECT * FROM blog_user WHERE user_name='${user.name}'`)
    // 2. 查到结果提示注册过
    if(result) res.status(801).json({errcode:801,message:"用户名已注册"})
    // 3. 未查到结果直接注册
    else{
        let insert_time = +new Date()
        let result = await findSome(`INSERT INTO blog_user(id,user_name,pwd,insert_time) VALUES(0,'${user.name}','${user.password}','${insert_time}')`)
        
        if(result)
            res.json({errcode:200,message:"用户名注册成功"})
        else
            res.status(501).json({errcode:501,message:"用户名注册失败"})
    }
}

// 登录逻辑
export async function Login(req:express.Request, res:express.Response){
    let user = req.body
    console.log(user)
    // 1. 查询是否存在当前用户
    let result = await findSome(`SELECT * FROM blog_user WHERE user_name='${user.name}'`)
    if(!result) res.status(800).json({errcode:800,message:"账号或密码错误！"})
    else{
        // 2. 校验密码
        if(user.password == result.pwd){
            let token = genToken({username:"gao"})
            res.json({token,errcode:501,message:"登录成功！"})
        }
        else res.status(803).json({errcode:803,message:"账号或密码错误！"})
    }
}

// 退出逻辑
export async function Logout(req:express.Request, res:express.Response){
    
}
