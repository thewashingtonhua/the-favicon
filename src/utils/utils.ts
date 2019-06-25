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
