const fs = require('fs')
const path = require('path')
const loaderHelper = require('./loader')
const serverEnv = require('./env')

const serverConfig = {
  'system': {
    base: '',
  },
  'mysql': {
    'user': 'travis',
    'database': 'ketchup',
    'port': 3306,
    'charset': 'utf8',
  },
}

const envConfig = loaderHelper.loadEnvConfig(__dirname)
Object.assign(serverConfig, envConfig[serverEnv.getCurrentEnv()] || {})

// 运行目录下的app.json有最高优先级
const appConfigPath = path.resolve('app.json')
Object.assign(serverConfig, loaderHelper.loadJsonConfig(appConfigPath))

module.exports = serverConfig
