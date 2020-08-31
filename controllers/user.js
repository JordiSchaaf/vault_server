const User = require('../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { validationResult } = require('express-validator')

exports.getUsers = (req, res) => {
    const users = User.find()
    .then((users) => {
        res.status(200).json(users)
    })
    .catch(err => console.log(err))
}


exports.createUser = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    } 
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Email address already exists'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })
                        user.save()
                            .then(result => {
                                console.log(result)
                                res.status(201).json({
                                    message: 'User created'
                                })
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
}

exports.deleteUser = (req, res) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: `User with id ${req.params.userId} deleted`
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

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

    // jwt.sign({user: user}, 'secretKey', (err, token) => {
    //     res.json({
    //         token: token
    //     })
    // })
}