const Koa = require('koa')
const app = new Koa()
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const config = require('./config')

// 使用响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyParser())

// 引入路由分发
const router = require('./routes')
app.use(router.routes())

// 启动程序，监听端口
module.exports = {
  getInstance: () => {
    return app
  },
  config,
}
