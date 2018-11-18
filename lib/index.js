require('./init')

const Koa = require('koa')
const logger = require('koa-logger')
const app = new Koa()
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const config = require('./config')

// 日志中间件
app.use(logger())

// 解析请求体
app.use(cors())
app.use(bodyParser())

// 使用响应处理中间件
app.use(response)

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
