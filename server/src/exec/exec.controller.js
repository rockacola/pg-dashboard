const debug = require('debug')
const express = require('express')
const { Client } = require('pg')

const log = debug('app:exec-controller')

class ExecController {
  static async checkConnection(req, res) {
    log('checkConnection triggered.')
    try {
      const dto = {
        host: req.query.host,
        user: req.query.user,
        password: req.query.pass,
        port: parseInt(req.query.port, 10),
        defaultDatabase: req.query.db,
      }
      log('dto:', dto)

      const client = await ExecController._getConnectedClient(dto)
      client.end()

      res.json({ isSuccess: true })
    } catch (err) {
      res.json({ isSuccess: false, message: err.message })
    }
  }

  static async query(req, res) {
    log('query triggered.')

    try {
      const dto = {
        host: req.query.host,
        user: req.query.user,
        password: req.query.pass,
        port: parseInt(req.query.port, 10),
        defaultDatabase: req.query.db,
        query: req.query.q,
      }
      // log('dto:', dto)

      const client = await ExecController._getConnectedClient(dto)
      const queryRes = await client.query(dto.query)
      console.log('queryRes:', queryRes)
      await client.end()

      res.json({ isSuccess: true, data: queryRes })
    } catch (err) {
      res.json({ isSuccess: false, message: err.message })
    }
  }

  static async _getConnectedClient(dto) {
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

module.exports = ExecController
