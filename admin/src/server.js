// server.js
const express = require('express')
const { parse } = require('url')
const next = require('next')
const { createProxyMiddleware } = require('http-proxy-middleware')

const devProxy = {
    '/api': {
        target: 'http://localhost:5501/', // 端口自己配置合适的
        pathRewrite: {
            '^/api': '/'
        },
        changeOrigin: true
    }
}

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  
  const server = express();

  // 代理
  Object.keys(devProxy).forEach(function(context) {
    server.use(context,createProxyMiddleware(devProxy[context]))
  });
    

  server.use((req, res) => {
    const parsedUrl = parse(req.url, true)
     return handle(req, res, parsedUrl)
  });

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })

})
.catch((err)=>{
  console.log(err)
})