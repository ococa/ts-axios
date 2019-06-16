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
