import stringify from 'json-stable-stringify'

export class StringHelper {
  /**
   * @param {Object} obj
   * @returns {string}
   */
  static getStableStringify(obj) {
    return stringify(obj)
  }
}
