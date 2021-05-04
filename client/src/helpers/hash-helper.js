import md5 from 'crypto-js/md5'
import { StringHelper } from './string-helper'

export class HashHelper {
  /**
   * @param {object} obj
   * @returns {string}
   */
  static getHashByObject(obj) {
    const objStr = StringHelper.getStableStringify(obj)
    return HashHelper.getHashByString(objStr)
  }

  /**
   * @param {string} str
   * @returns {string}
   */
  static getHashByString(str) {
    return md5(str).toString()
  }
}
