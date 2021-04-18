const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'subscriber',
  },
})

const User = model('User', UserSchema)
module.exports = User
