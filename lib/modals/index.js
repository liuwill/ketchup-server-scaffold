const fs = require('fs')
const path = require('path')
const BaseModal = require('./modal')
const mysqlConnector = require('../plugins/mysql')

let registerModals = {
  loadModals: function (modalPath) {
    const modals = {}
    if (!fs.existsSync(modalPath)) {
      return modals
    }

    if (!fs.statSync(modalPath).isDirectory()) {
      return modals
    }

    const subList = fs.readdirSync(modalPath)

    for (const file of subList) {
      const currentPath = path.join(modalPath, file)
      if (!fs.statSync(currentPath).isFile() || !currentPath.endsWith('.js')) {
        continue
      }

      const modal = require(currentPath)
      if (modal instanceof BaseModal) {
        modal.orm = mysqlConnector.mysql
        modals[modal.name] = modal
      }
    }

    return modals
  }
}

module.exports = Object.assign(registerModals, registerModals.loadModals(path.join(__dirname, './stub')))
