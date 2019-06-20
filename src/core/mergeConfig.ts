import { AxiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helper/utils'

// 合并策略的map，通过key实现合并策略的选择
const starts = Object.create(null)

/**
 * 合并策略：优先保留自定义配置
 * 如果customizeConfig不是undefined 则返回customizeConfig， 否则返回defaultConfig
 * @param customizeConfig
 * @param defaultConfig
 */
function defaultFromCustomizeConfigStart(defaultConfig: any, customizeConfig?: any) {
  return typeof customizeConfig !== 'undefined' ? customizeConfig : defaultConfig
}

/**
 * 合并策略：只保留自定义配置
 * 如果customizeConfig不是undefined 则返回customizeConfig， 否则不返回
 * @param customizeConfig
 * @param defaultConfig
 */
function onlyFromCustomizeConfigStart(defaultConfig: any, customizeConfig?: any): any {
  if (typeof customizeConfig !== 'undefined') {
    return customizeConfig
  }
}

/**
 * 合并策略：复杂对象合并策略
 * @param defaultConfig
 * @param customizeConfig
 */
function deepObjectStart(defaultConfig: any, customizeConfig?: any): any {
  if (isPlainObject(customizeConfig)) {
    return deepMerge(defaultConfig, customizeConfig)
  } else if (typeof customizeConfig !== 'undefined') {
    return customizeConfig
  } else if (isPlainObject(defaultConfig)) {
    return deepMerge(defaultConfig)
  } else if (typeof defaultConfig !== 'undefined') {
    return defaultConfig
  }
}

// 对象的合并策略
const startKeysDeepMerge = ['headers']
startKeysDeepMerge.forEach(key => {
  starts[key] = deepObjectStart
})

// 仅支持自定义策略的key
const stratKeysFromCustomize = ['url', 'params', 'data']
stratKeysFromCustomize.forEach(key => {
  starts[key] = onlyFromCustomizeConfigStart
})

export default function mergeConfig(
  defaultConfig: AxiosRequestConfig,
  customizeConfig?: AxiosRequestConfig
) {
  if (!customizeConfig) {
    customizeConfig = {}
  }

  const config = Object.create(null)

  // 遍历自定义配置
  for (let key in customizeConfig) {
    mergeField(key)
  }

  // 遍历默认配置 并且忽略自定义已经配置过的key
  for (let key in defaultConfig) {
    if (!customizeConfig[key]) {
      mergeField(key)
    }
  }

  /**
   * 策略模式应用，实现不同的headers key调用不同的方法
   * @param key
   */
  function mergeField(key: string): void {
    const start = starts[key] || defaultFromCustomizeConfigStart
    config[key] = start(defaultConfig[key], customizeConfig![key])
  }

  return config
}
