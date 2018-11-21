# ketchup-server-scaffold
[![Build Status](https://travis-ci.org/liuwill/ketchup-server-scaffold.svg?branch=master)](https://travis-ci.org/liuwill/ketchup-server-scaffold)
[![codecov](https://codecov.io/gh/liuwill/ketchup-server-scaffold/branch/master/graph/badge.svg)](https://codecov.io/gh/liuwill/ketchup-server-scaffold)

> 一个微信小程序app后台实现的脚手架

🍅  =>  🥫  =>  🍝

## 使用手册

### 项目依赖

* Node.js >= 8.12.0
* Koa.js

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

### 关于配置

项目的配置文件位于`lib/config`，目录下，系统默认的配置放在`index.js`文件内，`env.js`是对`process.env`的封装，避免业务代码层对其的直接全局变量引用。

如果config目录下有`json`类型的文件，会自动加载到内容中，并且检查与`NODE_ENV`环境变量对应的文件名，如果有的话，会用json中的配置覆盖默认配置。

最后，在项目运行工作目录下的`app.json`文件，有最高的配置优先级，而且这个文件不会提交到git代码库中，开发或者运维需要的话，可以通过这个文件覆盖所有项目代码中config下的配置。

### 编码规范

> 建议使用VS Code或者其他支持editorconfig和eslint提示的ide开发本项目

开发前先安装`EditorConfig for VS Code`和`ESLint`插件。

项目开发中使用两个空格作为缩进，对应配置在`.editorconfig`文件中配置。

eslint配置基于`standard`标准，根据个人风格和实践做了一些定制化配置，文件名为[.eslintrc](https://gist.github.com/liuwill/7b32fd006a6d5cb71ee023ab74415cd9).


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
