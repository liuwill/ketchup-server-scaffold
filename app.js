// const debug = require('debug')('ketchup-server-scaffold')
const logger = require('./lib/plugins/logger')

require('./lib/init').loadAppConfig('./app.json')

const serverApp = require('./lib')
const serverEnv = require('./lib/config/env').loadEnv()

const app = serverApp.getInstance()
const config = serverApp.config

let appPort = config.port || 8080
if (serverEnv['PORT']) {
  appPort = serverEnv['PORT']
}

app.listen(appPort, () => logger.info(`🎬 listening on port ${appPort}`))
