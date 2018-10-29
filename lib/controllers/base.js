class Controller {
  constructor(pathName, router) {
    this.pathName = pathName
    this.router = router
  }

  getPath() {
    return this.pathName
  }

  getRouter() {
    return this.router
  }
}

Controller.factory = function (pathName, router) {
  return new Controller(pathName, router)
}

module.exports = Controller
