const Router = require('koa-router')
const Controller = require('../base')

const router = new Router()

router.get('/data', async (ctx) => {
  ctx.body = {
    status: true,
    code: 200,
    msg: 'demo',
  }
})

router.get('/error', async (ctx) => {
  ctx.state.code = -1
})

module.exports = Controller.factory('/demo', router)
