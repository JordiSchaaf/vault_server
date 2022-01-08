const mongoose = require('mongoose')

const orgSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    orgName: {
        type: String,
        required: true
    }, 
    orgLogo: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model("Organisation", orgSchema)