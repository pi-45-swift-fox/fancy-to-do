const router = require('express').Router()
const thirdParty = require('../controllers/thirdParty')

router.post('/', thirdParty.getRecipe)
module.exports = router