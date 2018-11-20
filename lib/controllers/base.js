class Controller {
  constructor(pathName, router, middleware) {
    this.pathName = pathName
    this.router = router
    this.middleware = middleware
  }

  getPath() {
    return this.pathName
  }

  getRouter() {
    return this.router
  }

  getMiddleware() {
    return this.middleware
  }
}

Controller.factory = function (pathName, router, middleware) {
  return new Controller(pathName, router, middleware)
}

module.exports = Controller
