const Router = require('koa-router')

const router = new Router()

router.get('/status', async (ctx) => {
  ctx.body = {
    status: true,
    code: 200,
    msg: 'demo',
  }
})

module.exports = {
  router,
  install: (installer) => {
    installer.register('demo', router)
  },
}
