const app = require('./app')
const http = require('http')

const port = process.env.SERVER_PORT
const server = http.createServer(app)

if (process.env.DEBUG) {
  process.on('uncaughtException', (reason) => {
    log('Unhandled rejection. reason:', reason)
    process.exit(1)
  })
}

server.listen(port, () => {
  console.log(`🚀 Server running at port ${port}`)
})
