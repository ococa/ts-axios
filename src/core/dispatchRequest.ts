/**
 * 入口文件
 */
import { AxiosRequestConfig } from '../types'
import xhr from './xhr'
import { buildURL } from '../helper/buildURL'
import { transformRequest, transformResponse } from '../helper/data'
import { processHeaders, flatternHeaders } from '../helper/headers'
import { AxiosPromise, AxiosResponse } from '../types'
import { transform } from './transform'

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

/**
 * 总处理中心
 * @param config AxiosRequestConfig
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // headers在data之前处理，如果先处理data则会在headers里if判断出错
  config.data = transform(config.data, config.headers, config.transformRequest)

  // 对headers处理
  config.headers = flatternHeaders(config.headers, config.method!)

  console.log('process', config)
}

/**
 * 处理url
 * @param config AxiosRequestConfig
 */
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

/**
 * 处理response的data
 */
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

// 导出类型
export * from '../types'

export default dispatchRequest
