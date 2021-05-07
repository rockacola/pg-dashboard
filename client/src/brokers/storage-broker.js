import { LocalstorageHandler } from '../handlers/localstorage-handler'
import { StringHelper } from '../helpers/string-helper'

export class StorageBroker {
  /**
   * @returns {Object}
   */
  static getKnownConnections() {
    const strData = LocalstorageHandler.getData('pgd:connections')
    if (strData) {
      try {
        const data = JSON.parse(strData)
        return data
      } catch (err) {
        // TODO: exception handling
      }
    }

    return {}
  }

  /**
   * @returns {Object}
   */
  static getKnownTableNames() {
    const strData = LocalstorageHandler.getData('pgd:table-names')
    if (strData) {
      try {
        const data = JSON.parse(strData)
        return data
      } catch (err) {
        // TODO: exception handling
      }
    }

    return {}
  }

  /**
   * @returns {Object}
   */
  static getQueries() {
    const strData = LocalstorageHandler.getData('pgd:queries')
    if (strData) {
      try {
        const data = JSON.parse(strData)
        return data
      } catch (err) {
        // TODO: exception handling
      }
    }

    return {}
  }

  /**
   * @param {Object} connections
   */
  static setKnownConnections(connections) {
    const strData = StringHelper.getStableStringify(connections)
    LocalstorageHandler.setData('pgd:connections', strData)
  }

  /**
   * @param {Object} tableNames
   */
  static setKnownTableNames(tableNames) {
    const strData = StringHelper.getStableStringify(tableNames)
    LocalstorageHandler.setData('pgd:table-names', strData)
  }

  /**
   * @param {Object} queries
   */
  static setQueries(queries) {
    const strData = StringHelper.getStableStringify(queries)
    LocalstorageHandler.setData('pgd:queries', strData)
  }
}
