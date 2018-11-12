const Pino = require('pino')
const envConfig = require('../config/env')

const logConfig = {}
if (envConfig.isProduction()) {
  logConfig.level = 'info'
}

const logger = Pino(logConfig)

module.exports = logger
