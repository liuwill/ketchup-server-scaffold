const chai = require('chai')
const path = require('path')
const initializer = require('../../lib/init')
const appJson = require('../mock/app.json')
const envConfiguration = require('../../lib/config/env')
const { expect, assert } = chai

const expectMsg = Math.random().toString(36)
describe('initializer loader', function () {
  it('would load app.json', function () {
    const appConfig = initializer.loadAppConfig(path.join(__dirname, '../mock/app.json'))

    if (appJson.env) {
      for (let key in appJson.env) {
        expect(envConfiguration.get(key)).to.be.equal(appJson.env[key])
        expect(envConfiguration.get(key)).to.be.equal(appConfig.env[key])
      }
    }
  })

  it('would load empty', function () {
    const appConfig = initializer.loadAppConfig(path.join(__dirname, `../mock/${expectMsg}.json`))
    assert.isNull(appConfig)
  })

  it('would load fail if not json', function () {
    const appConfig = initializer.loadAppConfig(path.join(__dirname, `./init.js`))
    assert.isNull(appConfig)
  })
})
