/**
 * 入口文件
 */
import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helper/buildURL'
import { transformRequest, transformResponse } from './helper/data'
import { processHeaders } from './helper/headers'
import { AxiosPromise, AxiosResponse } from './types'

function axios(config: AxiosRequestConfig): AxiosPromise {
  // TODO
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
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

/**
 * 处理url
 * @param config AxiosRequestConfig
 */
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

/**
 * 设置headers
 * @param config
 */
function transformHeaders(config: AxiosRequestConfig): string {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

/**
 * 处理request 中body
 * @param config
 */
function transformRequestData(config: AxiosRequestConfig): any {
  const { data } = config
  return transformRequest(data)
}

/**
 * 处理response的data
 */
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

export default axios
