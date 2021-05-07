const debug = require('debug')
const express = require('express')
const PgClientHandler = require('../handlers/pg-client-handler')
const CastHelper = require('../helpers/cast-helper')

const log = debug('app:ExecController')

class ExecController {
  /**
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async checkConnection(req, res) {
    log('checkConnection triggered.')
    try {
      const dto = ExecController._getDto(req)
      log('dto:', dto)
      const client = await PgClientHandler.getConnectedClient(dto)
      client.end()

      res.json({ isSuccess: true })
    } catch (err) {
      res.json({ isSuccess: false, message: err.message })
    }
  }

  /**
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async query(req, res) {
    log('query triggered.')

    try {
      const dto = ExecController._getDto(req)
      // log('dto:', dto)
      const client = await PgClientHandler.getConnectedClient(dto)
      // log('client:', client)
      const query = req.query.q
      // log('query:', query)
      const queryRes = await PgClientHandler.query(client, query)
      // log('queryRes:', queryRes)
      await client.end()

      res.json({ isSuccess: true, data: queryRes })
    } catch (err) {
      res.json({ isSuccess: false, message: err.message })
    }
  }

  /**
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async getTables(req, res) {
    log('getTables triggered.')
    try {
      const dto = ExecController._getDto(req)
      const client = await PgClientHandler.getConnectedClient(dto)
      const queryRes = await PgClientHandler.getTableNames(client)
      // log('queryRes:', queryRes)
      client.end()

      res.json({ isSuccess: true, data: queryRes })
    } catch (err) {
      res.json({ isSuccess: false, message: err.message })
    }
  }

  /**
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async health(req, res) {
    res.json({ isSuccess: true })
  }

  /**
   * @param {express.Request} req
   * @returns {Object}
   */
  static _getDto(req) {
    const dto = {
      host: req.query.host,
      user: req.query.user,
      password: req.query.pass,
      port: parseInt(req.query.port, 10),
      defaultDatabase: req.query.db,
      ssl: CastHelper.toBool(req.query.ssl),
    }
    return dto
  }
}

module.exports = ExecController
