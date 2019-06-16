import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
  const { data = null, url, method = 'get', headers } = config

  // 新建xmlHttpRequest对象
  const request = new XMLHttpRequest()

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
}
