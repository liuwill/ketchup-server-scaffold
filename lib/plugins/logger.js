const Pino = require('pino')
const PinoCaller = require('pino-caller')
const envConfig = require('../config/env')

const logConfig = {
  prettyPrint: false,
  level: 'info',
}
if (!envConfig.isProduction()) {
  delete logConfig.level
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
