import  express  = require('express')
let router:express.Router = express.Router();
import * as AuthService from "../services/auth"

// 注册
router.post('/signup', AuthService.SignUp)

// 登录
router.post('/login', AuthService.Login)

// 退出
router.post('/logout', AuthService.Logout)


export default router