import qs from 'query-string'
import axios from 'axios'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

export class PgServerHandler {
  /**
   * @param {{ host: string, port: string|number, username: string, password: string, database: string }}
   * @returns {Promise<void>}
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
    if (!res || !res.data) {
      throw new Error(`Unable to connect to server: ${host}.`)
    }
    if (!res.data.isSuccess) {
      if (res.data.message) {
        throw new Error(res.data.message)
      } else {
        throw new Error(`Invalid URL request.`)
      }
    }
  }

  /**
   * @param {{ host: string, port: string|number, username: string, password: string, database: string }}
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

  /**
   * @param {{ host: string, port: string|number, username: string, password: string, database: string, query: string }}
   * @returns {Promise<string[]>}
   */
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
