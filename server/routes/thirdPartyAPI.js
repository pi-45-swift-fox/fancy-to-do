const router = require('express').Router()
const Controller = require('../controllers/thirdParty')
const thirdParty = require('../controllers/thirdParty')

router.get('/', Controller.catFact)
router.post('/', thirdParty.getRecipe)
module.exports = router