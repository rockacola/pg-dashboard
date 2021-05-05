const express = require('express')
const ExecController = require('./exec/exec.controller')

const router = express.Router()

router.get('/api/check', ExecController.checkConnection)
router.get('/api/query', ExecController.query)
router.get('/api/tables', ExecController.getTables)
router.get('/api/health', ExecController.health)

router.get('/', (req, res) => {
  res.json({ 'timestamp:': Date.now() })
})

module.exports = router
