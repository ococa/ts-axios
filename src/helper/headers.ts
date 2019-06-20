import { isPlainObject } from './utils'
import { Method } from '../types'
import { deepMerge } from './utils'

function normalizeHeaderName(headers: any, normalizeHeaderName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizeHeaderName && name.toUpperCase() === normalizeHeaderName.toUpperCase()) {
      headers[normalizeHeaderName] = headers[name]
      delete headers[name]
    }
  })
}

/**
 * 处理request的headers，当有data属性且没有设置content-type时候，
 * 自动设置content-type='application/json;charset=utf-8'
 * @param headers
 */
export function processHeaders(data: any, headers: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  // 如果没有content
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

/**
 * 处理返回的headers将string转换为object
 * @param headers
 */
export function parseHeaders(headers: string): object {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  //
  headers.split('\r\n').forEach(lineItem => {
    let [key, value] = lineItem.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (value) {
      value = value.trim()
    }
    parsed[key] = value
  })
  return parsed
}

export function flatternHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  headers = deepMerge(headers.common, headers[method], headers)

  const methodsToDelete = [
    'get',
    'post',
    'head',
    'options',
    ' post',
    'put',
    'patch',
    'common',
    'delete'
  ]

  methodsToDelete.forEach(method => {
    delete headers[method]
  })
  return headers
}
