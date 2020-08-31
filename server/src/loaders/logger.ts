import  winston = require("winston")
import config from '../config';

const transports = [];
// 定义输出模式
if(process.env.NODE_ENV !== 'development') {
  transports.push(
    new winston.transports.Console()
  )
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat()
      )
    }),
    new winston.transports.File({ filename:"combined.log", level: 'info' }),
    new winston.transports.File({ filename: 'errors.log', level: 'error' })
  )
}
const LoggerInstance = winston.createLogger({
    /**
    * 输出日志等级小于该设定值时输出，error: 0,warn: 1,info: 2,http: 3,verbose: 4,debug: 5,silly: 6
    */ 
    level: config.logs.level,
    // 日志等级定义，默认自带等级定义
    levels: winston.config.npm.levels,
    // 对输出信息进行格式化
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
        winston.format.colorize({
          colors:{info:"blue",warning:"yellow",error:"red"},
          level:true,
          all:true,
          message:true
        }),
    ),
    // 日志信息输出到哪里，例如某个文件或命令行，默认[]
    transports
  });
  
export default LoggerInstance;