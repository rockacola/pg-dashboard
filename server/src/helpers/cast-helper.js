class CastHelper {
  /**
   * @param {any} input
   * @returns {boolean}
   */
  static toBool(input) {
    if (typeof input === 'boolean') {
      return input
    }
    if (typeof input === 'string') {
      return input.toLowerCase() === 'true'
    }
    if (typeof input === 'number' || typeof input === 'bigint') {
      return input === 1
    }
    return false
  }
}

module.exports = CastHelper
