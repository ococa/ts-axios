import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helper/headers'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType } = config

    // 新建xmlHttpRequest对象
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    // 当readyState === 4 可以拿到响应结果
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText

      const response: AxiosResponse = {
        status: request.status,
        statusText: request.statusText,
        data: responseData,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

    // 建立连接
    request.open(method.toUpperCase(), url, true)

    // 设置headers
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    // 发送请求
    request.send(data)
  })
}
