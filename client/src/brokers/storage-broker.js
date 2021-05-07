import { LocalstorageHandler } from '../handlers/localstorage-handler'
import { StringHelper } from '../helpers/string-helper'

export class StorageBroker {
  /**
   * @returns {object}
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
   * @returns {object}
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
   * @returns {object}
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
   * @param {object} connections
   */
  static setKnownConnections(connections) {
    const strData = StringHelper.getStableStringify(connections)
    LocalstorageHandler.setData('pgd:connections', strData)
  }

  /**
   * @param {object} tableNames
   */
  static setKnownTableNames(tableNames) {
    const strData = StringHelper.getStableStringify(tableNames)
    LocalstorageHandler.setData('pgd:table-names', strData)
  }

  /**
   * @param {object} queries
   */
  static setQueries(queries) {
    const strData = StringHelper.getStableStringify(queries)
    LocalstorageHandler.setData('pgd:queries', strData)
  }
}
