const cors = require('cors')
const debug = require('debug')
const express = require('express')
const expressWinston = require('express-winston')
const winston = require('winston')
const router = require('./router')

const app = express()

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

app.use(expressWinston.logger(loggerOptions))

app.use('/', router)

module.exports = app
