const Org = require('../models/org')
const mongoose = require('mongoose')
const logger = require('../utils/logger')

const { validationResult } = require('express-validator')

exports.createOrg = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
  } 
  const org = new Org({
    _id: new mongoose.Types.ObjectId(),
    orgName: req.body.orgName,
    // orgLogo: Add the data for the logo
  })  
  org.save()
    .then(result => {
      res.status(201).json({
        message: 'Organisation created',
        orgId: result._id
      })
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({
        error: err
      })
    })
}

exports.getCurrentOrg = (req, res) => {
  Org.findOne({ _id: req.userData.orgId })
      .then((org) => {
        res.status(200).json({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        })
      })
      .catch(err => console.log(err))
}

exports.getDefaultCompany = (req, res) => {
    Org.findOne({ _id: 'vaultressorg' })
        .then((org) => {
            res.status(200).json({
                orgName: org.orgName,
                orgLogo: org.orgLogo
            })
        })
        .catch(err => {
            res.status(404).json({
                error: 'Could not get default company'
            })
            logger.error(err)
        })
}