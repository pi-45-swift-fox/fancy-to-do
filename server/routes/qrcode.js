const router = require('express').Router()
const ThirdPartyController = require('../controllers/thirdParty')

router.get('/',ThirdPartyController.getUrl)

module.exports = router