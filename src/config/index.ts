// 本文件包含项目的配置内容
// 部分配置与业务相关（如：第三方服务 AppID、参数配置等）
//
// 当前配置仅适用于「彩宝」
// 如需销售代码给其他客户，请务必清空利益相关的配置项

/**
 * @description 是否为线上生产环境
 */
export const IS_PROD = process.env.NODE_ENV === 'production'

/**
 * @description 部署环境
 */
export const BUILD_ENV: string = process.env.BUILD_ENV as string

/**
 * @description 是否为测试站环境
 */
export const IS_DEV = BUILD_ENV === 'DEV'

/**
 * @description 是否为正式站
 */
export const IS_RELEASE = BUILD_ENV === 'RELEASE'

/**
 * @description 是否生成打包分析
 */
export const GENERATE_REPORT = process.env.REPORT === 'true'

/**
 * @description 是否开启调试模式（打印日志等）
 */
export const DEBUG_MODE = !IS_RELEASE

/**
 * @description 是否开启 Mock
 */
export const USE_MOCK = !IS_PROD

interface Servers {
  API: Server,
  [index: string]: Server
}

interface Server {
  DEV: string,
  RELEASE: string,
  [index: string]: string
}

/**
 * @description 服务器地址
 */
export const SERVER: Servers = {
  // 接口地址
  API: {
    DEV: 'http://47.75.135.140:8001',
    RELEASE: 'https://api.caibao.com'
  }
}

/**
 * @description 接口前缀
 */
export const API_PREFIX = '/api'

/**
 * @description 接口服务器地址
 */
export const BASE_URL = IS_PROD
  ? SERVER.API[BUILD_ENV]
  : SERVER.API.DEV
  // : SERVER.API.RELEASE

/**
 * @description 网易验证码 ID
 */
export const CAPTCHA_ID = '659ba10af0634d2d9451f90fdcadb336'

/**
 * @description 清空该时间之前的缓存（用于解决线上垃圾数据）
 */
export const CACHE_LAST_CLEAR_TIME = new Date('2018-12-25 17:00:00').getTime()
