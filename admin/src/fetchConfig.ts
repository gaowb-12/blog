import { message } from 'antd';
let fetchProxyHandler = {
    // 拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
    apply(target:any, object:any, args:any){
        let options = args[1]||{};
        if(options){
            options = Object.assign(
                {},
                {
                    // 配置默认属性
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                }, 
                options
            )
        }
        args = [args[0],options]//重置参数数组

        return  Reflect.apply(target, object,args)
                .then((data:any)=>{
                    // 统一处理成json
                    return data.json()
                })
                .then((data:any)=>{
                    if(data.errcode!==200){
                        switch (data.errcode) {
                            case 400:
                                data.message = "请求错误(400)";
                                message.error(data.message)
                                break;
                            case 401:
                                data.message = "未授权，请重新登录(401)";
                                message.error(data.message)
                                break;
                            case 403:
                                data.message = "拒绝访问(403)";
                                message.error(data.message)
                                break;
                            case 404:
                                data.message = "请求出错(404)";
                                message.error(data.message)
                                break;
                            case 408:
                                data.message = "请求超时(408)";
                                message.error(data.message)
                                break;
                            case 500:
                                data.message = "服务器错误(500)";
                                message.error(data.message)
                                break;
                            case 501:
                                data.message = "服务未实现(501)";
                                message.error(data.message)
                                break;
                            case 502:
                                data.message = "网络错误(502)";
                                message.error(data.message)
                                break;
                            case 503:
                                data.message = "服务不可用(503)";
                                message.error(data.message)
                                break;
                            case 504:
                                data.message = "网络超时(504)";
                                message.error(data.message)
                                break;
                            case 505:
                                data.message = "HTTP版本不受支持(505)";
                                message.error(data.message)
                                break;
                            default:
                                // data.message = `连接出错(${data.status})!`;
                                message.error(data.message)
                        }
                    }
                    // 返回响应体
                    return data.body
                })
                .catch((err:any)=>{
                    message.error("网络故障或请求被阻止")
                    throw err
                })
    }
}
export default fetchProxyHandler