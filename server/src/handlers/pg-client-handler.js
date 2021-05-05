const { Client } = require('pg')
const debug = require('debug')

const log = debug('app:PgClientHandler')

class PgClientHandler {
  /**
   * @param {object} dto
   * @param {string|undefined} dto.user
   * @param {string|undefined} dto.password
   * @param {number|undefined} dto.host
   * @param {string|undefined} dto.port
   * @param {string|undefined} dto.database
   * @returns {Promise<Client>}
   */
  static async getConnectedClient(dto) {
    const client = new Client({
      user: dto.user,
      password: dto.password,
      host: dto.host,
      port: dto.port,
      database: dto.defaultDatabase,
    })
    await client.connect()
    return client
  }

  /**
   * @param {Client} client
   * @returns {Promise<object>}
   */
  static async getTableNames(client) {
    const query = `SELECT * FROM pg_tables WHERE schemaname = 'public'`
    const res = await client.query(query)

    /** @param {string[]} */
    const tables = []
    if (res.rows && res.rows.length > 0) {
      for (const row of res.rows) {
        if (row && row.tablename) {
          tables.push(row.tablename)
        }
      }
    }

    return tables
  }

  /**
   * @param {Client} client
   * @returns {Promise<object>}
   */
  static async query(client, query) {
    // log('query triggered. query:', query)
    const res = await client.query(query)
    // log('res:', res)
    // TODO: data massage
    return res
  }
}

module.exports = PgClientHandler
