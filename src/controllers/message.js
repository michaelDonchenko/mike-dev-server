const Message = require('../models/Message')

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find()

    res.status(200).json({
      success: true,
      messages,
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: 'An error occurred',
    })
  }
}

exports.newMessage = async (req, res) => {
  const { email, subject, message } = req.body
  try {
    if (!email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields required',
      })
    }

    if (message.length <= 15) {
      return res.status(400).json({
        success: false,
        message: 'Your message is to short',
      })
    }

    await Message.create({
      ...req.body,
    })

    res.status(200).json({
      success: true,
      message: 'Message sent succefully, thank you.',
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: 'An error occurred',
    })
  }
}
