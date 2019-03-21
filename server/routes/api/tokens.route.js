var express = require('express')
var router = express.Router()
var tokensController = require('../../controllers/tokens.controller')

router.get('/', tokensController.getToken)

module.exports = router
