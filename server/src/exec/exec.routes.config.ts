import express from 'express'
import { CommonRoutesConfig } from '../common/common.routes.config'

export class ExecRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'ExecRoutes')
  }

  configureRoutes() {
    this.app
      .route('/exec')
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send('Exec GET')
      })
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send('Exec POST')
      })

    this.app
      .route('/exec/:id')
      .all(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          // middleware function
          next()
        }
      )
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send('Exec GET')
      })
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send('Exec GET')
      })

    return this.app
  }
}
