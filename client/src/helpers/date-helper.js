export class DateHelper {
  /**
   *
   * @param {string} str
   * @returns {boolean}
   */
  static isIsoDate(str) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false
    const d = new Date(str)
    return d.toISOString() === str
  }
}
