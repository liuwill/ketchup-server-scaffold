const fs = require('fs')
const path = require('path')
const Controller = require('./base')

const isController = (controllerRouter) => {
  if (!controllerRouter && typeof controllerRouter !== 'object') {
    return false
  }

  if (controllerRouter instanceof Controller) {
    return true
  }

  return false
}

const bindController = function (installer, controllerPath) {
  const stack = [controllerPath]

  // 获得当前文件夹下的所有的文件夹和文件
  while (stack.length) {
    const current = stack.shift()
    const subList = fs.readdirSync(current)

    for (let file of subList) {
      const currentPath = path.join(current, file)
      const fileStat = fs.statSync(currentPath)
      if (fileStat.isDirectory()) {
        stack.push(currentPath)
        continue
      }

      if (file !== 'index.js') {
        continue
      }

      const controllerRouter = require(currentPath)
      if (isController(controllerRouter)) {
        installer.register(controllerRouter.getPath(), controllerRouter.getRouter(), controllerRouter.getMiddleware())
        // controllerRouter.install(installer)
      }
    }
  }
}

module.exports = {
  bind: (installer) => {
    const controllerPath = path.join(__dirname)
    bindController(installer, controllerPath)
  },
  bindController,
  isController,
}
