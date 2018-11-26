module.exports = {
  buildBody: (ctx) => {
    return ctx.body ? ctx.body : {
      code: ctx.state.code !== undefined ? ctx.state.code : 0,
      data: ctx.state.data !== undefined ? ctx.state.data : {},
    }
  },
  parseErrorMsg: (e) => {
    return e && e.message ? e.message : e.toString()
  },
}
