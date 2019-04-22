// 通用工具函数，与业务无关
// 主要涵盖：验证、格式化、转换
// 均为纯函数，不包含副作用

/**
 * @description 生成随机字符串
 * @param {number} len length of the string to generate
 * @returns {string} random string of given length
 */
export const randomString = (len: number = 32): string => {
  const CHAR_SET = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const maxPos = CHAR_SET.length
  let str = ''
  for (let i = 0; i < len; i++) {
    const pos = Math.floor(Math.random() * maxPos)
    str += CHAR_SET.charAt(pos)
  }
  return str
}

/**
 * @description 判断一个值是否是一个对象（而不是数组等其它继承自对象的类型）
 * @param {*} val 待验证的值
 * @returns {boolean} 判断结果
 */
export const isPlainObject = (val: any): boolean => {
  return (
    val != null &&
    typeof val === 'object' &&
    Array.isArray(val) === false
  )
}

/**
 * 比较两个 Semvor 版本号的大小
 * @param {string} ver1
 * @param {string} ver2
 * @returns {number} 两个版本之间的差距，0 表示两个版本号相同，返回大于 0 的数表示前者更大（ver1 > ver2），返回小于 0 的数表示后者更大（ver1 < version2)）
 */
export const compareSemvor = (ver1: string, ver2: string): number => {
  const ver1Arr = ver1.split('.').map(n => Number(n))
  const ver2Arr = ver2.split('.').map(n => Number(n))

  return (ver1Arr[0] - ver2Arr[0]) || (ver1Arr[1] - ver2Arr[1]) || (ver1Arr[2] - ver2Arr[2])
}

/**
 * @description 给球的数字前面补零
 * @param val {string | number} 待格式化的内容
 */
export const padZero = (val: string | number) => String(val).padStart(2, '0')
