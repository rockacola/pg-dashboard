const express = require('express')
const ExecController = require('./exec/exec.controller')

const router = express.Router()

router.get('/check-connection', ExecController.checkConnection)
router.get('/query', ExecController.query)

router.get('/', (req, res) => {
  res.json({ 'message:': 'ok' })
})

module.exports = router
