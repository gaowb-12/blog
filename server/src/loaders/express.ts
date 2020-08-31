import  express  = require('express')
import  bodyParser = require('body-parser')
import Router from "../route"
export default async function({app}:{app:express.Application}) {
    // 解析请求体
    // 解析x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    // 解析application/json格式
    app.use(bodyParser.json());

    // 注册路由
    app.use(Router)

    app.use((req:express.Request, res:express.Response, next:express.NextFunction) => {
        let err:Error = new Error('Not Found');
        (err as any).status = 404;
        next(err);
    });

    app.use((err:express.Errback, req:express.Request, res:express.Response, next:express.NextFunction) => {
        res.status((err as any).status || 500);
        res.json({
            errors: {
                message: (err as any).message,
            },
        });
    });
}