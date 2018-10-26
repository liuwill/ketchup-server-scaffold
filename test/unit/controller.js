const chai = require('chai')
const controller = require('../../lib/controllers')
const { expect, assert } = chai

const expectMsg = Math.random().toString(36)
describe('controller unit test', function () {
  it('would test is controller', function () {
    expect(controller.isController()).to.be.equal(false)
    expect(controller.isController({})).to.be.equal(false)
  })
})
