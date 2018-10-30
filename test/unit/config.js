const chai = require('chai')
const envConfiguration = require('../../lib/config/env')

const { expect, assert } = chai

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
