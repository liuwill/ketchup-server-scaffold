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
    let useRouteArgument = [path]
    if (middleware && middleware instanceof Array && middleware.length) {
      useRouteArgument = useRouteArgument.concat(middleware)
    } else if (middleware && middleware instanceof Function) {
      useRouteArgument.push(middleware)
    }

    useRouteArgument = useRouteArgument.concat([router.routes(), router.allowedMethods()])
    this.innerRouter.use.apply(this.innerRouter, useRouteArgument)
  }
}

module.exports = RouterRegister
