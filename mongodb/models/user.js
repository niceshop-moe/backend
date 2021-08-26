const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);
module.exports = User;