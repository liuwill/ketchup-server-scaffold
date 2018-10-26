const Router = require('koa-router')

const registerRouter = new Router()

module.exports = {
  router: () => {
    return registerRouter
  },
  register: (path, router, middleware) => {
    registerRouter.use(path, router.routes(), router.allowedMethods())
  }
}
