const { check } = require('express-validator')

exports.createUser = [check('email').isEmail()]
