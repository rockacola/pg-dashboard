const { Client } = require('pg')

class PgClientHandler {
  /**
   * @param {object} dto
   * @param {string|undefined} dto.user
   * @param {string|undefined} dto.password
   * @param {number|undefined} dto.host
   * @param {string|undefined} dto.port
   * @param {string|undefined} dto.database
   * @returns {Client}
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
}

module.exports = PgClientHandler
