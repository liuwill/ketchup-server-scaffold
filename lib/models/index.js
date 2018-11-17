const mysqlConnector = require('../plugins/mysql')
const modelStubs = require('./stub')

let registerModels = {
  orm: mysqlConnector.mysql,
}

for (let stub in modelStubs) {
  modelStubs[stub].orm = mysqlConnector.mysql
}

module.exports = Object.assign(registerModels, modelStubs)
