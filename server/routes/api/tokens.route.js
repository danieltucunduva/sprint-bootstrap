var express = require('express')
var router = express.Router()
var tokensController = require('../../controllers/tokens.controller')

router.get('/token', tokensController.getToken)

module.exports = router
