import  express  = require('express')

import loaders from "./loaders"
import config from './config';

const app:express.Application = express()

// 初始化服务
loaders({exporessApp:app})

app.listen(config.port, (err:express.Errback) => {
    if (err) throw err
    console.log(`start server on http://localhost:${config.port}`)
})