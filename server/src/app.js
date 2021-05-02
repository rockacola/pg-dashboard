const cors = require('cors')
const debug = require('debug')
const express = require('express')
const expressWinston = require('express-winston')
const http = require('http')
const winston = require('winston')
const ExecController = require('./exec/exec.controller')

//

const app = express()
const router = express.Router()
const server = http.createServer(app)
const port = process.env.SERVER_PORT
const log = debug('app')

app.use(express.json())
app.use(cors())

const loggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
}

if (process.env.DEBUG) {
  process.on('uncaughtException', (reason) => {
    log('Unhandled rejection. reason:', reason)
    process.exit(1)
  })
} else {
  loggerOptions.meta = false
}

app.use(expressWinston.logger(loggerOptions))

// TODO: move router
// Router
router.get('/', (req, res) => {
  res.json({ 'message:': 'ok1' })
})
router.get('/check-connection', ExecController.checkConnection)
router.get('/query', ExecController.query)

app.use('/', router)

// TODO: split 'server' and 'app
server.listen(port, () => {
  log(`Server running at port ${port}`)
})
