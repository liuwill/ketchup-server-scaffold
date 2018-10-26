const appServer = require('../../lib')
const supertest = require('supertest')

const app = appServer.getInstance()
const server = app.listen()
const request = supertest(server)

module.exports = {
  createRequest: () => {
    return request
  },
  server,
}
