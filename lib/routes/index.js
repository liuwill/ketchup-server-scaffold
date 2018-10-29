/**
 * ajax 服务路由集合
 */
const Router = require('koa-router')
const RouterRegister = require('./register')
const controller = require('../controllers')

const rootRouter = new Router()
const setupTime = new Date()

rootRouter.get('/status', async (ctx) => {
  ctx.body = {
    status: true,
    code: 200,
    time: setupTime.toISOString(),
    version: 'current',
  }
})

const routerRegister = new RouterRegister(new Router())
controller.bind(routerRegister)

const apiRouter = routerRegister.router()
rootRouter.use('/api', apiRouter.routes(), apiRouter.allowedMethods())

module.exports = rootRouter
