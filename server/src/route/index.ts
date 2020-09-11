import  express  = require('express')
let router:express.Router = express.Router()
import authRoute  from './auth'
import article  from './article'
import { isAuth } from '../middlewares/auth'

// 校验token
router.use(isAuth)

// token校验失败的处理
router.use((err:express.Errback, req:express.Request, res:express.Response, next:express.NextFunction) => {
  console.log(req.headers.authorization)
  global.Logger.error(err)
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('无效的token,请重新登录');
  }
  else{
    next()
  }
});

// 鉴权相关子路由
router.use(authRoute)

// 文章相关
router.use(article)

// 关于页面
router.get('/about', (req:express.Request, res:express.Response) => {
  res.send('About birds')
})

export default router