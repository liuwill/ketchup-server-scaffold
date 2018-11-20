const crypto = require('crypto')
const ADMIN_PWD_SECRET = '' // 随机生成的动物名，md5加密密码时的secret
const ADMIN_TOKEN_SECRET = ''

const md5 = data => crypto.createHash('md5').update(data).digest('hex')

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

module.exports = {
  md5,
  sha1,
  aesDecrypt,
  signAdminPwdDigest,
}
