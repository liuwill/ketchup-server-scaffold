const chai = require('chai')
const Router = require('koa-router')
const RouterRegister = require('../../lib/routes/register')
const { expect, assert } = chai

describe('RouterRegister test', function () {
  it('would RouterRegister be build', function () {
    const sourceRouter = new Router()
    const secondRouter = new Router()

    const register = new RouterRegister(sourceRouter)
    expect(register.router()).to.be.equal(sourceRouter)
    expect(register.router()).to.be.not.equal(secondRouter)
  })
})
