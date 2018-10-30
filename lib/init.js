const envConfig = require('./config/env')
const fs = require('fs')

function isAppEnvSet(appConfig) {
  return appConfig && appConfig.env && appConfig.env instanceof Object
}

function loadAppConfig(pathname) {
  if (!fs.existsSync(pathname)) {
    return null
  }

  let content = fs.readFileSync(pathname, 'utf8')
  let appConfig = null
  try {
    appConfig = JSON.parse(content)
  } catch (err) {
    appConfig = null
  }

  if (isAppEnvSet(appConfig)) {
    for (let key in appConfig.env) {
      envConfig.set(key, appConfig.env[key])
    }
  }

  return appConfig
}

module.exports = {
  loadAppConfig,
  isAppEnvSet,
}
