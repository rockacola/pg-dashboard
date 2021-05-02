import debug from 'debug'
import express from 'express'
import { Client, QueryResult } from 'pg'
import { ConnectExecDto, QueryExecDto } from './connect.exec.dto'

const log: debug.IDebugger = debug('app:exec-controller')

export class ExecController {
  static async checkConnection(req: express.Request, res: express.Response) {
    log('checkConnection triggered.')
    try {
      // TODO: better type handle
      const dto: ConnectExecDto = {
        host: req.query.host as string,
        user: req.query.user as string,
        password: req.query.pass as string,
        port: parseInt(req.query.port as string, 10),
        defaultDatabase: req.query.db as string,
      }
      log('dto:', dto)

      const client = await ExecController.getConnectedClient(dto)
      client.end()

      res.json({ isSuccess: true })
    } catch (err) {
      res.json({ isSuccess: false, message: err.message })
    }
  }

  static async query(req: express.Request, res: express.Response) {
    log('query triggered.')

    try {
      // TODO: better type handle
      const dto: QueryExecDto = {
        host: req.query.host as string,
        user: req.query.user as string,
        password: req.query.pass as string,
        port: parseInt(req.query.port as string, 10),
        defaultDatabase: req.query.db as string,
        query: req.query.q as string,
      }
      // log('dto:', dto)

      const client = await ExecController.getConnectedClient(dto)
      const queryRes: QueryResult<any> = await client.query(dto.query)
      console.log('queryRes:', queryRes)
      await client.end()

      res.json({ isSuccess: true, data: queryRes })
    } catch (err) {
      res.json({ isSuccess: false, message: err.message })
    }
  }

  private static async getConnectedClient(
    dto: ConnectExecDto
  ): Promise<Client> {
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
