import express from 'express'

export class ExecController {
  static checkConnection(req: express.Request, res: express.Response) {
    res.json({ isSuccess: true })
  }
}
