/**
 * 默认的http request header 配置
 */
import { AxiosRequestConfig } from './types'
import { transformRequest, transformResponse } from './helper/data'
import { processHeaders } from './helper/headers'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  // 请求数据默认处理管道
  transformRequest: [
    function(data: any, headers: any) {
      processHeaders(data, headers)
      return transformRequest(data)
    }
  ],
  // 响应数据默认处理管道
  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ]
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodWithData = ['post', 'put', 'patch']

// 给带data的http方式添加默认请求头
methodWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
