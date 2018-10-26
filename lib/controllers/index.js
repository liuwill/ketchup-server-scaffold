const fs = require('fs')
const path = require('path')

module.exports = {
  bind: (installer) => {
    const controllerPath = path.join(__dirname)
    const stack = [controllerPath]
    let isRoot = true

    // 获得当前文件夹下的所有的文件夹和文件
    while(stack.length) {
      const current = stack.shift()
      const subList = fs.readdirSync(current)

      for (let file of subList) {
        const currentPath = path.join(current, file)
        const fileStat = fs.statSync(currentPath)
        if (fileStat.isDirectory()) {
          stack.push(currentPath)
          continue
        }

        if (file !== 'index.js' || isRoot) {
          continue
        }

        const controllerRouter = require(currentPath)
        if (controllerRouter && typeof controllerRouter === 'object' && typeof controllerRouter.install === 'function') {
          controllerRouter.install(installer)
        }
      }

      isRoot = false
    }
  }
}
