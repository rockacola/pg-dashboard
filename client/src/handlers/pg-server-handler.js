import qs from 'query-string'
import axios from 'axios'

const SERVER_BASE_URL = `http://localhost:3300/api` // TODO: move to env var

export class PgServerHandler {
  /**
   * @param {string} host
   * @param {string|number} port
   * @param {string} user
   * @param {string} pass
   * @param {string} db
   * @returns {Promise<object>}
   */
  static async checkConnection({ host, port, username, password, database }) {
    const params = {
      host,
      port,
      user: username,
      pass: password,
      db: database,
    }
    const url = qs.stringifyUrl({
      url: SERVER_BASE_URL + '/check',
      query: params,
    })
    const res = await axios.get(url)
    return res.data
  }

  /**
   * @param {string} host
   * @param {string|number} port
   * @param {string} user
   * @param {string} pass
   * @param {string} db
   * @returns {Promise<string[]>}
   */
  static async getTables({ host, port, username, password, database }) {
    const params = {
      host,
      port,
      user: username,
      pass: password,
      db: database,
    }
    const url = qs.stringifyUrl({
      url: SERVER_BASE_URL + '/tables',
      query: params,
    })
    const res = await axios.get(url)
    return res.data.data
  }

  static async query({ host, port, username, password, database, query }) {
    const params = {
      host,
      port,
      user: username,
      pass: password,
      db: database,
      q: query,
    }
    const url = qs.stringifyUrl({
      url: SERVER_BASE_URL + '/query',
      query: params,
    })
    const res = await axios.get(url)
    return res.data
  }
}
