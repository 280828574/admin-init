import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import urlList from '@/constant/domainAddress'
import scripts from '@/scripts/base'

// import domainAddress from '@/constant/domainAddress'

// create an axios instance
const service = axios.create({
  baseURL: `${urlList.domainAddress}work_order/`, // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    let token = window.sessionStorage.getItem('userId');
    // do something before request is sent
    for (const i in config.header) {
      config.headers[i] = config.header[i]
    }
    if (token) {
      config.headers['X-Access-Token'] = token
    }
    if (!config.data) {
      config.data = []
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 404) {
        Message({
          message: '用户名密码错误!',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(new Error(res.msg || 'Error'))
      }
      if (res.code === 558) {
        Message({
          message: res.msg || '网络错误请稍后重试!',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(new Error(res.msg || 'Error'))
      }
      if (res.code === 558) {
        Message({
          message: res.msg || '网络错误请稍后重试!',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(new Error(res.msg || 'Error'))
      }
      if (res.code === 559) {
        Message({
          message: res.msg || '网络错误请稍后重试!',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(new Error(res.msg || 'Error'))
      }
      if (response.status === 200 && res.code !== 500) {
        return res
      } else {
        Message({
          message: res.msg || '网络错误请稍后重试!',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(new Error(res.msg || 'Error'))
      }
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
