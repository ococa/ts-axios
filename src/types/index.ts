// 字符串字面量类型
export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'options'
  | 'OPTIONS'

/**
 * function Axios config interface
 */

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

/**
 * axios返回类型，继承promise泛型
 */
export interface AxiosPromise extends Promise<AxiosResponse> {}

/**
 * axiosError类接口
 */
export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: number | string
  request?: any
  response?: AxiosResponse
}

/**
 * axios class interface
 */
export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestConfig): AxiosPromise

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise

  head(url: string, config?: AxiosRequestConfig): AxiosPromise

  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(url: string, body?: any, config?: AxiosRequestConfig): AxiosPromise

  put(url: string, body?: any, config?: AxiosRequestConfig): AxiosPromise

  patch(url: string, body?: any, config?: AxiosRequestConfig): AxiosPromise
}

/**
 * 混合类型接口
 */
export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
}
