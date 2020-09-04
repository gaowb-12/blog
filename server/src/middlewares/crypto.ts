import crypto from "crypto"
import config from "../config"

export default function getHash(password:string){
    // 使用hmac算法，指定hash算法为sha256，第二个参数为盐值
    let hmac = crypto.createHmac("sha256",config.salt);
    return hmac.update(password).digest("base64")
}