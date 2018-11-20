const chai = require('chai')
const Router = require('koa-router')
const RouterRegister = require('../../lib/routes/register')
const { expect, assert } = chai

describe('RouterRegister test', function () {
  it('should RouterRegister be build', function () {
    const sourceRouter = new Router()
    const secondRouter = new Router()

    const register = new RouterRegister(sourceRouter)
    expect(register.router()).to.be.equal(sourceRouter)
    expect(register.router()).to.be.not.equal(secondRouter)
  })

  it('should RouterRegister register middleware', function () {
    const sourceRouter = new Router()
    const middleRouter = new Router()
    const register = new RouterRegister(sourceRouter)
    const getFunc = async () => { }
    const middleware = async () => { }
    middleRouter.get('user', getFunc)

    register.register('middle', middleRouter, middleware)
    register.register('group', middleRouter, [middleware])

    const matchRouter = sourceRouter.match('middle/user')
    const groupRouter = sourceRouter.match('group/user')

    expect(middleware).to.be.equal(matchRouter.path[0].stack[0])
    expect(middleware).to.be.equal(groupRouter.path[0].stack[0])
  })
})
