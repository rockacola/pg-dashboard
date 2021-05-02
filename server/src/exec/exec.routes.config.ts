import express from 'express'
import { CommonRoutesConfig } from '../common/common.routes.config'
import { ExecController } from './exec.controller'

export class ExecRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'ExecRoutes')
  }

  configureRoutes() {
    this.app.route('/check-connection').get(ExecController.checkConnection)
    this.app.route('/query').get(ExecController.query)

    return this.app
  }
}
