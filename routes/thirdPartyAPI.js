const router = require('express').Router()
const Controller = require('../controllers/thirdParty')

router.get('/', Controller.catFact)

module.exports = router