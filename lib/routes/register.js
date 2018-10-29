const Router = require('koa-router')

class RouterRegister {
  constructor(...args) {
    if (args[0] instanceof Router) {
      this.innerRouter = args[0]
    } else {
      this.innerRouter = new Router(...args)
    }
  }

  router() {
    return this.innerRouter
  }

  register(path, router, middleware) {
    this.innerRouter.use(path, router.routes(), router.allowedMethods())
  }
}

module.exports = RouterRegister
