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
    })

    const responseData = callResult.data
    if (responseData.errcode) {
      logger.error(constants.ERRORS.ERR_GET_QR_CODE_UNLIMITED, responseData.errmsg)
      throw new Error(`${constants.ERRORS.ERR_GET_QR_CODE_UNLIMITED}`)
    }
    return responseData
  }
}

module.exports = WeAppSDK
