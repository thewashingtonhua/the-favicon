/**
 * @description 对 SessionStorage 操作的封装
 * @class SDB
 */
class SDB {
  /**
   * @description get data from sessionStorage
   *
   * @static
   * @param {string} name - name of the item
   * @returns {json | string} data, in JSON if possible, or undefined if not found.
   *
   * @memberOf SDB
   */
  // TODO: support param as array, return object of requested params
  static get (name: string = ''): any {
    let data = null

    if (window.sessionStorage) {
      data = window.sessionStorage.getItem(name)
      if (!data) return data
      try {
        data = JSON.parse(data)
      } catch (e) {
        console.error('Error from SDB.get()')
        console.error(e)
      }
    }

    return data
  }

  /**
   * @description set data to sessionStorage
   *
   * @static
   * @param {string} name - name of the item
   * @param {string} data - data to store (will be convert into JSON if possible)
   * @returns {boolean} if succeeded.
   *
   * @memberOf SDB
   */
  static set (name: string = '', data: any = ''): boolean {
    if (!name) return false

    data = JSON.stringify(data)
    window.sessionStorage.setItem(name, data)
    return true
  }

  /**
   * @description remove item from sessionStorage
   *
   * @static
   * @param {string} name - name of the item
   * @returns {boolean} if succeeded.
   *
   * @memberOf SDB
   */
  static remove (name: string = ''): boolean {
    if (!name) return false

    window.sessionStorage.removeItem(name)
    return true
  }

  /**
   * @description clear all data in sessionStorage under current origin
   *
   * @static
   * @returns {boolean} if succeeded.
   *
   * @memberOf SDB
   */
  static clear (): boolean {
    window.sessionStorage.clear()
    return true
  }
}

export default SDB
