const Pino = require('pino')
const PinoCaller = require('pino-caller')
const envConfig = require('../config/env')

const logConfig = {
  prettyPrint: true,
}
if (envConfig.isProduction()) {
  logConfig.level = 'info'
  logConfig.prettyPrint = false
}

let logger = Pino(logConfig)
if (!envConfig.isProduction()) {
  logger = PinoCaller(logger)
}

module.exports = logger
