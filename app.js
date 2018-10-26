const debug = require('debug')('ketchup-server-scaffold')

const serverApp = require('./lib')
const serverEnv = require('./lib/env').loadEnv()

const app = serverApp.app
const config = serverApp.config

let appPort = config.port || 8080
if (serverEnv['PORT']) {
  appPort = serverEnv['PORT']
}

app.listen(appPort, () => debug(`🍅 listening on port ${appPort}`))
