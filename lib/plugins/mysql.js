const configs = require('../config')
const envConfig = require('../config/env')
const confUtils = require('../utils/config')

const Knex = require('knex')

function createConnect(dbConfig) {
  return new Knex({
    client: 'mysql',
    connection: {
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      charset: dbConfig.charset,
    }
  })
}

function checkConfig(dbConfig) {
  const CONFIG_FIELDS = ['host', 'user', 'password', 'database', 'charset']
  const OPTION_FIELDS = ['port', 'password', 'charset']
  if (!dbConfig || !(dbConfig instanceof Object)) {
    return false
  }

  for (let key of CONFIG_FIELDS) {
    if (!dbConfig[key] && !OPTION_FIELDS.includes(key)) {
      return false
    }
  }

  return true
}

function attachMultiConnector(mysqlConfig) {
  const handlers = {}
  for (let key in mysqlConfig) {
    let currentConfig = mysqlConfig[key]
    if (!checkConfig(currentConfig)) {
      continue
    }

    handlers[key] = createConnect(currentConfig)
  }
  return handlers
}

const connectHandles = {
  checkConfig,
  createConnect,
  attachMultiConnector,
}

let defaultHandle = null
const appDbConfig = confUtils.loadMysqlConfigFromEnv(envConfig.loadEnv())
const defaultConfig = configs.mysql

if (checkConfig(defaultConfig)) {
  defaultHandle = createConnect(defaultConfig)
}

if (!defaultHandle) {
  if (checkConfig(appDbConfig)) {
    defaultHandle = createConnect(appDbConfig)
  }
}

connectHandles.mysql = defaultHandle
module.exports = connectHandles
