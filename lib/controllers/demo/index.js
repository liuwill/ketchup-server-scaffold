const Router = require('koa-router')

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

module.exports = {
  getPath: () => {
    return '/demo'
  },
  getRouter: () => {
    return router
  },
}
