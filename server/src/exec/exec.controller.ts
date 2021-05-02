import debug from 'debug'
import express from 'express'
import { Client } from 'pg'
import { ConnectExecDto } from './connect.exec.dto'

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
      res.json({ isSuccess: true })
    } catch (err) {
      res.json({ isSuccess: false, message: err.message })
    }
  }

  static query(req: express.Request, res: express.Response) {
    log('query triggered.')
    res.json({ isSuccess: false, message: 'Not implemented.' })
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
