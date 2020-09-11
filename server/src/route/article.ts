import  express  = require('express')
let router:express.Router = express.Router();
import * as AuthService from "../services/article"

// 文章列表
router.get('/article', AuthService.ArticleList)


export default router