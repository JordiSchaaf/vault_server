const express = require('express')
const orgController = require('../controllers/org')

const router = express.Router()

router.post("/new", orgController.createOrg)

router.get("/default_company", orgController.getDefaultCompany)

module.exports = router