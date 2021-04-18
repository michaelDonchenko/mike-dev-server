const { Schema, model } = require('mongoose')

const MessageSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
)

const Message = model('Message', MessageSchema)
module.exports = Message
