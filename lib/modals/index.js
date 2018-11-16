const mysqlConnector = require('../plugins/mysql')
const modalStubs = require('./stub')

let registerModals = {
  orm: mysqlConnector.mysql,
}

module.exports = Object.assign(registerModals, modalStubs)
