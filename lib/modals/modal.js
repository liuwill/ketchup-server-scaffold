class BaseModal {
  constructor(stub) {
    this.stub = stub
    this.table = stub.table
    this.fields = stub.fields
    this.name = stub.name
    this.orm = null
  }

  getOrm() {
    return this.orm || null
  }

  toObject(data) {
    const target = {}
    for (let key of this.fields) {
      if (typeof data[key] !== 'undefined') {
        target[key] = data[key]
      } else {
        target[key] = null
      }
    }

    return target
  }
}

module.exports = BaseModal
