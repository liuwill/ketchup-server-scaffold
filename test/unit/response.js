const chai = require('chai')
const response = require('../../lib/middlewares/response')

const { expect, assert } = chai

describe('middleware response', function () {
  it('would catch when throw', function (done) {
    const context = {
      body: {},
    }

    const errorMsg = Math.random().toString(36)
    response(context, async () => {
      throw new Error(errorMsg)
    }).then(() => {
      expect(context.body.error).to.equal(errorMsg)
      expect(context.body.code).to.equal(-1)

      done()
    })
  })
})
