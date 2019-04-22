/**
 * @description 对 LocalStorage 操作的封装
 * @class DB
 */
class DB {
  /**
   * @description get data from localStorage
   *
   * @static
   * @param {string} name - name of the item
   * @returns data (JSON.parsed), or undefined if not found.
   *
   * @memberOf DB
   */
  // TODO: support param as array, return object of requested params
  static get (name: string = ''): any {
    if (window.localStorage) {
      let data = window.localStorage.getItem(name)
      if (!data) return data
      try {
        data = JSON.parse(data)
        return data
      } catch (e) {
        console.error('Error from DB.get()')
        console.error(e)
      }
    }

    return undefined
  }

  /**
   * @description set data to localStorage
   *
   * @static
   * @param {string} name - name of the item
   * @param data - data to store (will be JSON.stringified into string)
   * @returns {boolean} if succeeded.
   *
   * @memberOf DB
   */
  static set (name: string = '', data: any = ''): boolean {
    if (!name) return false

    data = JSON.stringify(data)
    window.localStorage.setItem(name, data)
    return true
  }

  /**
   * @description remove item from localStorage
   *
   * @static
   * @param {string} name - name of the item
   * @returns {boolean} if succeeded.
   *
   * @memberOf DB
   */
  static remove (name: string = ''): boolean {
    if (!name) return false

    window.localStorage.removeItem(name)
    return true
  }

  /**
   * @description clear all data in localStorage under current origin
   *
   * @static
   * @returns {boolean} if succeeded.
   *
   * @memberOf DB
   */
  static clear (): boolean {
    window.localStorage.clear()
    return true
  }
}

export default DB
