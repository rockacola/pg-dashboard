export class LocalstorageHandler {
  /**
   * @param {string} key
   * @returns {string|undefined}
   */
  static getData(key) {
    return localStorage.getItem(key) || undefined
  }

  /**
   * @param {string} key
   * @param {string} data
   */
  static setData(key, data) {
    localStorage.setItem(key, data)
  }

  /**
   * @param {string} key
   */
  static removeData(key) {
    localStorage.removeItem(key)
  }
}
