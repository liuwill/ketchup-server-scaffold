class BaseModel {
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

  Model() {
    if (this.orm) {
      return this.orm(this.table)
    }
    return null
  }

  __pickRow(data) {
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

  toArray(raw) {
    if (raw instanceof Array) {
      return raw.map(this.__pickRow)
    }

    return []
  }

  toObject(raw) {
    if (raw instanceof Array) {
      if (!raw.length) {
        return null
      }
      return this.__pickRow(raw[0])
    }

    return this.__pickRow(raw)
  }
}

module.exports = BaseModel
