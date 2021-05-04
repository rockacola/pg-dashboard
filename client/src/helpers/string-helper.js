import stringify from 'json-stable-stringify'

export class StringHelper {
  /**
   * @param {object} obj
   * @returns {string}
   */
  static getStableStringify(obj) {
    return stringify(obj)
  }
}
