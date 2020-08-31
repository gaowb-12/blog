import  express  = require('express')
import { genToken } from '../middlewares/auth'
async function SignUp(req:express.Request, res:express.Response){
    
}
async function Login(req:express.Request, res:express.Response){
    let token = genToken({username:"gao"})
    res.send(token)
}
async function Logout(req:express.Request, res:express.Response){
    
}

export default {
    SignUp,
    Login,
    Logout,
}