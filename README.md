# ketchup-server-scaffold
[![Build Status](https://travis-ci.org/liuwill/ketchup-server-scaffold.svg?branch=master)](https://travis-ci.org/liuwill/ketchup-server-scaffold)
[![codecov](https://codecov.io/gh/liuwill/ketchup-server-scaffold/branch/master/graph/badge.svg)](https://codecov.io/gh/liuwill/ketchup-server-scaffold)

> 一个微信小程序app后台实现的脚手架

🍅  =>  🥫  =>  🍝

## 使用手册

### 如何添加新的接口控制器

本项目中控制器的实现是约定优于配置的方式，通过实现特定接口的模块文件，放在特定目录实现的。

如果要新增加一个控制器，只需要在`controllers`目录下增加一个新的目录，并且增加一个index.js文件，再index.js模块导出的对象中，实现两个方法，getPath和getRouter，分别返回本级路由的路径和koa-router对象，初始化的时候会自动绑定，不需要主动引用文件路径。

示例代码：
```javascript
const Router = require('koa-router')

const router = new Router()

router.get('/data', async (ctx) => {
  ctx.body = {
    status: true,
    msg: 'demo',
  }
})

module.exports = {
  getPath: () => {
    return '/demo'
  },
  getRouter: () => {
    return router
  },
}
```
