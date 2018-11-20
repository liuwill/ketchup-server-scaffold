const chai = require('chai')
const path = require('path')
const envConfiguration = require('../../lib/config/env')
const loaderHelper = require('../../lib/config/loader')

const { expect, assert } = chai

describe('config test', function () {
  describe('config loader test', function () {
    it('loadJsonConfig json config success', function () {
      const mockApp = loaderHelper.loadJsonConfig(path.join(__dirname, '../mock/app.json'))
      expect(mockApp).to.have.deep.property('env')
    })

    it('loadJsonConfig empty config success', function () {
      const mockApp = loaderHelper.loadJsonConfig(path.join(__dirname, '../mock/null.json'))
      assert.isEmpty(mockApp)
    })

    it('loadJsonConfig not json config success', function () {
      const mockApp = loaderHelper.loadJsonConfig(path.join(__dirname, './config.js'))
      assert.isEmpty(mockApp)
    })

    it('should loadEnvConfig success', function () {
      const envConfigs = loaderHelper.loadEnvConfig(path.join(__dirname, '../mock'))
      expect(envConfigs).to.have.deep.property('app')
    })
  })

  describe('env config test', function () {
    it('control env', function () {
      envConfiguration.set('NODE_ENV', 'development')
      assert.isFalse(envConfiguration.isProduction())

      envConfiguration.set('NODE_ENV', 'production')
      assert.isTrue(envConfiguration.isProduction())
      expect(envConfiguration.getCurrentEnv()).to.be.equal('production')
    })

    it('properties works', function () {
      const expectMsg = Math.random().toString(36)
      const key = `ENV_${expectMsg}`
      assert.isFalse(envConfiguration.has(key))

      envConfiguration.set(key, expectMsg)
      assert.isTrue(envConfiguration.has(key))
      expect(envConfiguration.get(key)).to.be.equal(expectMsg)
    })

    it('load env', function () {
      const envData = envConfiguration.loadEnv()
      for (let key in envData) {
        expect(envData[key]).to.be.equal(envConfiguration.get(key))
      }
    })
  })
})
