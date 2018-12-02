const Pino = require('pino')
const PinoCaller = require('pino-caller')
const envConfig = require('../config/env')

const logConfig = {
  prettyPrint: false,
  level: 'info',
}
if (!envConfig.isProduction()) {
  logConfig.level = 'debug'
  logConfig.prettyPrint = {
    colorize: true,
    translateTime: 'SYS:standard',
  }
}

let logger = Pino(logConfig)
if (!envConfig.isProduction()) {
  logger = PinoCaller(logger)
}

module.exports = logger
