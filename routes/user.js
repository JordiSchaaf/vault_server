const express = require('express')
const userController = require('../controllers/user')
const { createUser } = require('../validators')
const checkAuth = require('../middleware/check-auth')

const router = express.Router()

router.get("/", userController.getUsers)

router.get("/me", checkAuth, userController.getCurrentUser)

router.post("/signup", createUser, userController.createUser)

router.delete("/delete/:userId", checkAuth, userController.deleteUser)

module.exports = router