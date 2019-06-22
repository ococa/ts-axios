import { transformResponse } from '../helper/data'

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

  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]

  cancelToken?: CancelToken

  [propName: string]: any
}

export interface AxiosResponse<T = any> {
  //响应数据支持泛型
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

/**
 * axios返回类型，继承promise泛型
 */
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

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
  // 属性
  defaults: AxiosRequestConfig

  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }

  // 方法
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, body?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, body?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, body?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

/**
 * 混合类型接口
 * AxiosInstance类型定义
 */
export interface AxiosInstance extends Axios {
  // Situation a: one parameters
  // 泛型支持，AxiosPromise是传入T  config之前是传出
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  // Situation b: two parameters
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance
  cancelToken: CancelTokenStatic
  cancel: CancelStatic
  isCancel: (value?: any) => boolean
}

/**
 * AxiosInterceptor(拦截器)类的接口定义
 */
export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T = any> {
  // 参数val 返回 T或者promise
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

/**
 * CancelToken 是实例类型的接口定义
 */
export interface CancelToken {
  promise: Promise<Cancel>

  reason?: Cancel // promise，resolve函数的参数

  throwIfRequested(): void
}

/**
 * Canceler 是取消方法的接口定义
 */
export interface Canceler {
  (message?: string): void
}

/**
 * 传给cancelToken构造函数的类型
 */
export interface CancelExecutor {
  (cancle: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message?: string): Cancel
}
