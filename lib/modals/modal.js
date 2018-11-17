class BaseModal {
  constructor(stub) {
    this.stub = stub
    this.table = stub.table
    this.fields = stub.fields
    this.columns = Object.keys(stub.fields)
    this.name = stub.name
    this.orm = null
  }

  getOrm() {
    return this.orm || null
  }

  Modal() {
    if (this.orm) {
      return this.orm(this.table)
    }
    return null
  }

  toObject(data) {
    const target = {
      id: data.id,
    }
    for (let key in this.fields) {
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
