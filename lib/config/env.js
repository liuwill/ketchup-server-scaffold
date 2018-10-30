const processEnv = Object.assign({}, process.env)

module.exports = {
  loadEnv: () => {
    return processEnv
  },
  has: (key) => {
    if (typeof processEnv[key] === 'undefined') {
      return false
    }
    return true
  },
  get: (key) => {
    return processEnv[key]
  },
  set: (key, val) => {
    processEnv[key] = val
  },
  getCurrentEnv: () => {
    return processEnv['NODE_ENV']
  },
  isProduction: () => {
    return processEnv['NODE_ENV'] === 'production'
  },
}
