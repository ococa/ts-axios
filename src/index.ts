import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helper/utils'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

/**
 * 工厂函数，创建Axios class 实例
 */
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)

  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  // 类型断言
  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

console.log(axios)

// 返回axios实例
export default axios
