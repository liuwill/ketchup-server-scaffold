const uuidGenerator = require('uuid/v4')
const crypto = require('crypto')

const generateUUID = () => {
  return uuidGenerator().split('-').join('')
}

const generateOrderId = () => {
  return generateUUID()
}

const generatePayTradeId = () => {
  return uuidGenerator().split('-').join('')
}

function generateHexTimeStamp() {
  let length = 8
  let currentSecond = Date.now() / 1000
  let timestamp = parseInt(currentSecond, 10) % 0xFFFFFFFF

  timestamp = timestamp.toString(16)
  return (timestamp.length === length) ? timestamp : '00000000'.substring(timestamp.length, length) + timestamp
}

const generateGeneralId = (prefix) => {
  prefix = prefix || ''
  const generatedShareId = generateUUID()
  const currentTime = Date.now()

  const secret = crypto.createHash('md5').update(`${generatedShareId}-${currentTime}`).digest('hex')
  const shortSecret = secret.substr(8, 16)
  const timestamp = generateHexTimeStamp()
  return `${prefix}${timestamp}${shortSecret}`
}

const generateShortUUID = (prefix) => {
  prefix = prefix || ''
  const generatedShareId = generateUUID()
  const currentTime = Date.now()

  const timestamp = generateHexTimeStamp()
  const secret = crypto.createHash('md5').update(`${prefix}-${generatedShareId}-${currentTime}`).digest('hex')
  const shortSecret = secret.substr(8, 6)

  let postfix = currentTime % 100
  if (postfix < 10) {
    postfix = `0${postfix}`
  }
  return `${timestamp}${shortSecret}${postfix}`
}

module.exports = {
  generateUUID,
  generateOrderId,
  generatePayTradeId,
  generateHexTimeStamp,
  generateGeneralId,
  generateShortUUID,
}
