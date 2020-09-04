// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
  // 加密盐值
  salt:"gaowb_12@163.com",
  /**
   * Your favorite port
   */
  port: 5501,

  /**
   * Your logs
   */
  logs:{
    level:"info",
  },
  // The _secret_ to sign the JWTs
  jwts:{
    jwtSecret:process.env.JWT_SECRET||"secret", 
    path:["/login","/signup"], //添加不需要token的接口
    expires:60*60*24, //设置token的过期时间
  },
  // 数据库配置
  database:{
    host:"localhost",
    port:3306,
    user:"root",
    password:"Gwb12291010",
    database : 'blog'
  }

};
