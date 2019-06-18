import { AxiosInstance, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helper/utils'
import defaults from './defaults'
/**
 * 工厂函数，创建Axios class 实例
 */
function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)

  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  // 类型断言
  return instance as AxiosInstance
}

const axios = createInstance(defaults)

console.log(axios)

// 返回axios实例
export default axios
