const processEnv = Object.assign({}, process.env)

module.exports = {
  loadEnv: () => {
    return processEnv
  },
  has: (key) => {
    if (!processEnv[key]) {
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
}
