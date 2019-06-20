import { AxiosTransformer } from '../types'

export function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) {
    return data
  }
  // 将fns转换为数组
  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  fns.forEach(fn => {
    // data是引用类型，循环遍历用转化函数处理data，结果作为下次循环的参数data，实现管道效果
    data = fn(data, headers)
  })
  return data
}
