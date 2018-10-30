const configs = require('../config')
const envConfig = require('../config/env')
const confUtils = require('../utils/config')

const Knex = require('knex')

function createConnect(dbConfig) {
  if (!checkConfig(dbConfig)) {
    return null
  }

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

function buildMultiConnector(mysqlConfig) {
  const handlers = {}
  for (let key in mysqlConfig) {
    let currentConfig = mysqlConfig[key]
    const newConnection = createConnect(currentConfig)

    if (newConnection) {
      handlers[key] = newConnection
    }
  }
  return handlers
}

function findDefaultConfig(mysqlConfig, appDbConfig) {
  if (checkConfig(appDbConfig)) {
    return appDbConfig
  }

  if (checkConfig(mysqlConfig)) {
    return mysqlConfig
  }

  for (let key in mysqlConfig) {
    let currentConfig = mysqlConfig[key]
    if (checkConfig(currentConfig)) {
      return currentConfig
    }
  }

  return null
}

function attachConnector(raw, multiHandlers) {
  for (let key in multiHandlers) {
    raw[key] = multiHandlers[key]
  }
}

const connectHandles = {
  checkConfig,
  createConnect,
  findDefaultConfig,
  buildMultiConnector,
  attachConnector,
}

const appDbConfig = confUtils.loadMysqlConfigFromEnv(envConfig.loadEnv())
const defaultConfig = findDefaultConfig(configs.mysql, appDbConfig)

connectHandles.mysql = createConnect(defaultConfig)
const multiHandlers = buildMultiConnector(configs.mysql)
attachConnector(connectHandles, multiHandlers)

module.exports = connectHandles
