import { isDate, isPlainObject } from './utils'

function encode(value: string): string {
  return encodeURIComponent(value)
    .replace(/%40/g, '@')
    .replace(/%24/g, '$')
    .replace(/%20/g, '+')
    .replace(/%3A/gi, ':')
    .replace(/%2C/gi, ',')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * 通过url和params返回最终发送请求的url地址
 * @param url     {string}
 * @param params  {any}
 */
export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }
  const parts: string[] = []
  // 将params转换为字符串组成的数组
  Object.keys(params).forEach(key => {
    const value = params[key]
    // 如果value 为null或者undefined
    if (value === null || typeof value === 'undefined') {
      return
    }
    let values = []
    // 如果value是数组
    if (Array.isArray(value)) {
      values = value
      key += '[]'
    } else {
      // 将value变为数组，将所有的value当作数组处理
      values = [value]
    }

    // 将value 转换为拼接字符串数组的一个值
    values.forEach(value => {
      if (isDate(value)) {
        value = value.toISOString()
      } else if (isPlainObject(value)) {
        value = JSON.stringify(value)
      }
      parts.push(`${encode(key)}=${encode(value)}`)
    })
  })

  // 拼接字符串
  let serializedParams = parts.join('&')

  // 过滤hash
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 如果url中已经有问号则添加& 否则添加？
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
