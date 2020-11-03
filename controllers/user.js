const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { validationResult } = require('express-validator')

exports.getUsers = (req, res) => {
    const users = User
        .find()
        .then((users) => {
            res.status(200).json(users)
        })
        .catch(err => console.log(err))
}

exports.getCurrentUser = (req, res) => {
    const user = User
        .findOne({ _id: req.userData.userId })
        .then((user) => {
            res.status(200).json({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            })
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
                            password: hash,
                            firstName: '',
                            lastName: ''
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
