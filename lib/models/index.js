const mysqlConnector = require('../plugins/mysql')
const modelStubs = require('./stub')

let registerModels = {
  orm: mysqlConnector.mysql,

  toObject: (raw) => {
    if (raw instanceof Array) {
      if (!raw.length) {
        return null
      }
      return raw[0]
    }

    return raw
  },
}

for (let stub in modelStubs) {
  modelStubs[stub].orm = mysqlConnector.mysql
}

module.exports = Object.assign(registerModels, modelStubs)
