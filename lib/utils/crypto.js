const crypto = require('crypto')
// const ADMIN_PWD_SECRET = '' // 随机生成的动物名，md5加密密码时的secret
// const ADMIN_TOKEN_SECRET = ''

/**
 * 生成md5签名
 *
 * @param {*} data 字符串
 * @param {*} isShort 是否取中间16位
 */
const md5 = (data, isShort = false) => {
  let result = crypto.createHash('md5').update(data).digest('hex')
  if (isShort) {
    result = result.substr(8, 16)
  }
  return result
}

const sha1 = message => {
  return crypto.createHash('sha1').update(message, 'utf8').digest('hex')
}

const signAdminPwdDigest = (pwd) => {
  return md5(pwd)
}

const aesDecrypt = (key, iv, crypted) => {
  crypted = Buffer.from(crypted, 'base64')
  key = Buffer.from(key, 'base64')
  iv = Buffer.from(iv, 'base64')
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
  let decoded = decipher.update(crypted, 'base64', 'utf8')
  decoded += decipher.final('utf8')
  return decoded
}

const decryptWxData = function (appId, sessionKey, encryptedData, iv) {
  // base64 decode
  sessionKey = Buffer.from(sessionKey, 'base64')
  encryptedData = Buffer.from(encryptedData, 'base64')
  iv = Buffer.from(iv, 'base64')

  var decoded = null
  try {
    // 解密
    var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
    // 设置自动 padding 为 true，删除填充补位
    // decipher.setAutoPadding(true)
    decoded = decipher.update(encryptedData, 'binary', 'utf8')
    decoded += decipher.final('utf8')
    decoded = JSON.parse(decoded)
  } catch (err) {
    console.log(err)
    throw new Error('Illegal Buffer')
  }

  if (decoded.watermark.appid !== appId) {
    throw new Error('Illegal Buffer')
  }

  return decoded
}

module.exports = {
  md5,
  sha1,
  aesDecrypt,
  signAdminPwdDigest,
  decryptWxData,
}
