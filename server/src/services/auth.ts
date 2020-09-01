import  express  = require('express')
import { genToken } from '../middlewares/auth'
import { parse } from "url"
import { findSome ,insert } from "../models"
async function SignUp(req:express.Request, res:express.Response){
    let token = genToken({username:"gao"})
    res.send(token)
}
async function Login(req:express.Request, res:express.Response){
    let user:{[p:string]:any} = req.body;// 获取用户信息
    let result = await findSome(`SELECT * FROM blog_user WHERE user_name=${user.name}`)
    console.log(result)
    res.send("login")
}
async function Logout(req:express.Request, res:express.Response){
    
}

export default {
    SignUp,
    Login,
    Logout,
}