/**
 * ajax 服务路由集合
 */
const Router = require('koa-router')
const RouterRegister = require('./register')
const controller = require('../controllers')
const systemConfig = require('../config')

const rootRouter = new Router()
const setupTime = new Date()

const basePath = (systemConfig.system && systemConfig.system.base) || ''

rootRouter.get(`${basePath}/status`, async (ctx) => {
  ctx.body = {
    status: true,
    code: 200,
    time: setupTime.toISOString(),
    version: 'current',
  }
})

const routerRegister = new RouterRegister()
controller.bind(routerRegister)

const apiRouter = routerRegister.router()
rootRouter.use(`${basePath}/api`, apiRouter.routes(), apiRouter.allowedMethods())

module.exports = rootRouter
