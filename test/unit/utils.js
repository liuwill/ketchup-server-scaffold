const chai = require('chai')
const contextUtils = require('../../lib/utils/context')

const { expect, assert } = chai

const expectMsg = Math.random().toString(36)
describe('utils test', function () {
  it('would error message parse', function () {
    const msg = contextUtils.parseErrorMsg(new Error(expectMsg))
    const pureMsg = contextUtils.parseErrorMsg(expectMsg)

    expect(msg).to.be.equal(expectMsg)
    expect(pureMsg).to.be.equal(expectMsg)
  })

  it('would body state handled', function () {
    const stateBody = {
      state: {
        code: -1,
        data: expectMsg,
      }
    }
    const dataBody = {
      body: expectMsg
    }
    const emptyBody = {
      state: {}
    }
    const stateResult = contextUtils.buildBody(stateBody)
    const emptyResult = contextUtils.buildBody(emptyBody)
    const dataResult = contextUtils.buildBody(dataBody)

    expect(dataResult).to.be.equal(expectMsg)
    expect(stateResult.data).to.be.equal(expectMsg)
    expect(emptyResult.code).to.be.equal(0)
  })
})
