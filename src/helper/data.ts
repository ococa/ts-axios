import { isPlainObject } from './utils'
/**
 * 处理request body 的data
 */
export function transformRequest(data: any): any {
  // 如果是对象，则转换为json字符串
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      console.log('transFormResponse throw error: ', e)
    }
  }
  return data
}
