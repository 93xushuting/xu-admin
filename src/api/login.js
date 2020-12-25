import request from '@/utils/request'
import { PRODUCT_ID, CLIENT_ID, CLIENT_SECRET, UAC_API, AUTH_API } from '@/config'
// 登录获取token
export function loginByUsername(data) {
  data.client_id = CLIENT_ID
  data.client_secret = CLIENT_SECRET
  data.grant_type = 'password'
  return request({
    url: `${AUTH_API}/oauth/token/json`,
    method: 'POST',
    data
  })
}

// 用户信息
export function getUserInfo() {
  return request({
    url: `${UAC_API}/uac/tenant/users/info`,
    method: 'POST',
    data: { productId: PRODUCT_ID }
  })
}
