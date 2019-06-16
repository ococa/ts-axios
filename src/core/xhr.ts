import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helper/headers'
import { createError } from '../helper/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    // 新建xmlHttpRequest对象
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    // 当readyState === 4 可以拿到响应结果
    request.onreadystatechange = function handleLoad() {
      /**
       *  0	UNSENT	              代理被创建，但尚未调用 open() 方法。
       *  1	OPENED	              open() 方法已经被调用。
       *  2	HEADERS_RECEIVED	    send() 方法已经被调用，并且头部和状态已经可获得。
       *  3	LOADING	              下载中； responseText 属性已经包含部分数据。
       *  4	DONE	                下载操作已完成。
       */
      if (request.readyState !== 4) {
        return
      }

      /**
       * http status
       * DONE（完成） 200
       */
      if (request.status === 0) {
        return
      }

      // 设置response组装数据
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
      handleResponse(response)
    }

    // 网络异常处理
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    // 超时错误处理
    request.ontimeout = function handleTimeout() {
      reject(
        createError(`Timeout of ${config.timeout} ms exceeded`, config, 'ECONNABORTED', request)
      )
    }

    // 建立连接
    request.open(method.toUpperCase(), url!, true)

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

    /**
     * response 处理
     * @param response
     */
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
