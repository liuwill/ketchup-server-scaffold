const crypto = require('crypto')
const ADMIN_PWD_SECRET = '' // 随机生成的动物名，md5加密密码时的secret
const ADMIN_TOKEN_SECRET = ''

const md5 = data => crypto.createHash('md5').update(data).digest('hex')

const signAdminPwdDigest = (pwd) => {
  return md5(pwd)
}

module.exports = {
  md5,
  signAdminPwdDigest,
}
