import cors from 'cors'
import debug from 'debug'
import express from 'express'
import expressWinston from 'express-winston'
import http from 'http'
import winston from 'winston'
import { CommonRoutesConfig } from './common/common.routes.config'
import { ExecRoutes } from './exec/exec.routes.config'

const app: express.Application = express()
const server: http.Server = http.createServer(app)
const port = 3000 // TODO: move to config
const routes: Array<CommonRoutesConfig> = []
const debugLog: debug.IDebugger = debug('app')

app.use(express.json())
app.use(cors())

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
}

if (process.env.DEBUG) {
  process.on('uncaughtException', (reason) => {
    debugLog('Unhandled rejection. reason:', reason)
    process.exit(1)
  })
} else {
  loggerOptions.meta = false
}

app.use(expressWinston.logger(loggerOptions))

routes.push(new ExecRoutes(app))

app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ 'message:': 'ok' })
})

server.listen(port, () => {
  debugLog(`Server running at port ${port}`)
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`)
  })
})
