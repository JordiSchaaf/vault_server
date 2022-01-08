const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    permissionLevel: {
        type: Number,
        required: true,
        default: 2
    },
    orgId: {
        type: mongoose.Types.ObjectId,
        required: true
    }

})

module.exports = mongoose.model("User", userSchema)