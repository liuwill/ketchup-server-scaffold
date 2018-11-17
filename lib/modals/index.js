const mysqlConnector = require('../plugins/mysql')
const modalStubs = require('./stub')

let registerModals = {
  orm: mysqlConnector.mysql,
}

for (let stub in modalStubs) {
  modalStubs[stub].orm = mysqlConnector.mysql
}

module.exports = Object.assign(registerModals, modalStubs)
