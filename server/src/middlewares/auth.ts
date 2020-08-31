import  express  = require('express')
import expressJwt from "express-jwt"
import jwt from "jsonwebtoken"
import config from '../config';

// 自定义token的位置
const getTokenFromHeader = (req:express.Request) => {
    if (
      (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
      (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    ) {
      return req.headers.authorization.split(' ')[1];
    }
    else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
};
  
//使用此方法拦截所有请求，校验token是否正确（此方法写在静态资源加载之后，不然静态资源不能访问）
const isAuth = expressJwt({
    secret: config.jwts.jwtSecret, //加密密钥
    algorithms:['HS256'], //配置算法
    requestProperty: 'token', // Use req.token to store the JWT
    getToken: getTokenFromHeader, // How to extract the JWT from the request
})
.unless({
    path: config.jwts.path //添加不需要校验token的接口
})

// 生成token
const genToken = function(user:any){
    return jwt.sign(
        {
            username:user.username,
            // _id: user._id, // We are gonna use this in the middleware 'isAuth'
            // role: user.role,
            // exp: config.jwts.expires,//时间戳到期时间
        },
        config.jwts.jwtSecret,
        {
            algorithm: 'HS256',
            expiresIn:config.jwts.expires
        }
    );
}

export {
    isAuth,
    genToken
}