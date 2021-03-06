const http = require('axios')
const logger = require('../plugins/logger')
const constants = require('../config/constants')
const querystring = require('querystring')

class WeAppSDK {
  /**
   * 获取Access Token
   * @param {*} appId 小程序的appid
   * @param {*} appSecret 小程序的appsecret
   * @returns access_token
   * @throws NetWorkError 抛出网络错误异常，请根据需要捕获处理
   * @return {Promise}
   */
  async loadAccessToken(appId, appSecret) {
    const response = await http({
      url: constants.WX_ACCESS_TOKEN_URL,
      method: 'GET',
      params: {
        appid: appId,
        secret: appSecret,
        grant_type: 'client_credential',
      },
    })

    let responseData = response.data
    if (responseData.errcode || !responseData.access_token || !responseData.expires_in) {
      logger.error(constants.ERRORS.ERR_GET_ACCESS_TOKEN, responseData.errmsg)
      throw new Error(`${constants.ERRORS.ERR_GET_ACCESS_TOKEN}`)
    }

    return responseData.access_token
  }

  /**
   * 发送模版消息的标准方法
   * @param {*} accessToken
   * @param {*} formId 支付id
   * @param {*} openId 用户openid
   * @param {object} param2 { templateId 模版id, messageBody 消息体数组, page 跳转页面 }
   * @throws NetWorkError 抛出网络错误异常，请根据需要捕获处理
   * @return {Promise}
   */
  async pushTemplateMessage(accessToken, formId, openId, { templateId, messageBody, page }) {
    let requestUrl = `${constants.WX_TEMPLATE_SEND_URL}?access_token=${accessToken}`

    return http({
      url: requestUrl,
      method: 'POST',
      data: {
        touser: openId,
        template_id: templateId,
        page,
        form_id: formId,
        data: messageBody.reduce((result, item, index) => {
          let content = {
            value: item,
          }

          if (typeof item === 'object' && item) {
            content = item
          }
          result[`keyword${index + 1}`] = content
          return result
        }, {}),
      },
    })
  }

  /**
   * 获取小程序二维码
   *
   * @param {*} accessToken
   * @param {*} page 小程序页面地址
   * @param {*} scene 请求参数
   * @param {*} options 其他参数设置，参看[https://developers.weixin.qq.com/miniprogram/dev/api/open-api/qr-code/getWXACodeUnlimit.html]
   * @throws NetWorkError 抛出网络错误异常，请根据需要捕获处理
   * @return {Promise}
   */
  async getWXACodeUnlimited(accessToken, page, scene, options) {
    let requestUrl = `${constants.WX_QR_CODE_UNLIMITED_URL}?access_token=${accessToken}`
    let sceneData = scene
    if (typeof scene === 'object' && scene) {
      sceneData = querystring.stringify(scene)
    }

    const callResult = await http({
      url: requestUrl,
      method: 'POST',
      data: Object.assign({
        scene: sceneData,
        page,
      }, options),
      responseType: 'stream',
    })

    const responseData = callResult.data
    if (responseData.errcode) {
      logger.error(constants.ERRORS.ERR_GET_QR_CODE_UNLIMITED, responseData.errmsg)
      throw new Error(`${constants.ERRORS.ERR_GET_QR_CODE_UNLIMITED}`)
    }

    if (responseData instanceof Buffer) {
      return responseData
    }

    return new Promise((resolve, reject) => {
      var bufferList = []
      responseData.on('data', function (d) { bufferList.push(d) })
      responseData.on('end', function () {
        var buf = Buffer.concat(bufferList)
        resolve(buf)
      })
      responseData.on('error', () => {
        reject(new Error('生成二维码异常'))
      })
    })
  }

  /**
   * session key 交换
   * @param {string} appid
   * @param {string} appsecret
   * @param {string} code
   * @return {Promise}
   */
  getSessionKey(appid, appsecret, code) {
    return http({
      url: constants.WX_CODE2SESSION_API_URL,
      method: 'GET',
      params: {
        appid: appid,
        secret: appsecret,
        js_code: code,
        grant_type: 'authorization_code',
      },
    }).then(response => {
      let responseData = response.data
      if (responseData.errcode || !responseData.openid || !responseData.session_key) {
        logger.error('%s: %O', constants.ERRORS.ERR_GET_SESSION_KEY, responseData.errmsg)
        throw new Error(`${constants.ERRORS.ERR_GET_SESSION_KEY}`)
      } else {
        logger.error('openid: %s, session_key: %s', responseData.openid, responseData.session_key)
        return responseData
      }
    })
  }
}

module.exports = WeAppSDK
