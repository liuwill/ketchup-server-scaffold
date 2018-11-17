/**
 * 从对象中pick需要的字段
 *
 * @param {Array} fields 要pick的字段
 * @param {Object} data 原始数据
 */
const pickField = (fields, data) => {
  const target = {}
  for (let key of fields) {
    if (typeof data[key] !== 'undefined') {
      target[key] = data[key]
    }
  }
  return target
}

module.exports = {
  pickField,
}
