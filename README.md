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
const Controller = require('../base')

const router = new Router()

router.get('/data', async (ctx) => {
  ctx.body = {
    status: true,
    msg: 'demo',
  }
})

module.exports = Controller.factory('/demo', router)
```

### 关于日志

本项目使用[pino](https://github.com/pinojs/pino)，作为日志输出工具。

输出的是json格式的日志，如果提供的参数是对象，会自动assign到输出的对象中，字符串则统一join到msg字段。

例如：
```javascript
const logger = require('./lib/plugins/logger')

logger.info('hello')
// {"level":30,"time":1541992046760,"msg":"hello","pid":6387,"hostname":"liuwill-MacBook-Pro.local","v":1}

logger.info({ data: 'hello' })
// {"level":30,"time":1541992163328,"pid":6443,"hostname":"liuwill-MacBook-Pro.local","data":"hello","v":1}
```

### 启动服务和测试

启动服务：
```shell
# nodemon watch模式启动服务
$ yarn run start

# 启动dev模式
$ yarn run dev

# 启动生产模式
$ make production
```

单元测试：
```shell
# 运行测试用例
$ yarn run test

# 测试覆盖率统计
$ yarn run coverage
```
