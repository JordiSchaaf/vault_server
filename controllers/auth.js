const User = require('../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.loginUser = (req, res) => {
  User.findOne({ email: req.body.email })
      .exec()
      .then(user => {
          bcrypt.compare(req.body.password, user.password, (err, result) => {
              if (err) {
                  return res.status(401).json({
                      message: 'Auth failed'
                  })
              }
              if (result) {
                  const token = jwt.sign ({
                      email: user.email,
                      userId: user._id
                  }, process.env.JWT_key)
                  return res.status(200).json({
                      message: 'Auth succesful',
                      token: token
                  })
              }
              res.status(401).json({
                  message: 'Auth failed'
              })
          })
      })
      .catch(err => {
          console.log(err)
          res.status(400).json({
              error: 'User does not exist'
          })
      })
}