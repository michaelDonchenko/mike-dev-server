const { PASSWORD, SECRET, CLIENT_URL } = require('../constants')
const { sign } = require('jsonwebtoken')
const User = require('../models/User')

exports.login = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    if (password !== PASSWORD) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    let payload = {
      id: user._id,
      username,
    }

    const token = await sign(payload, SECRET)

    //success response
    return res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        domain: CLIENT_URL,
      })
      .json({
        success: true,
        message: 'Logged in succefully',
        user,
      })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: 'An error occurred',
    })
  }
}

exports.logout = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie('token', {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        domain: CLIENT_URL,
      })
      .json({
        success: true,
        message: 'Logged out succefully',
        user: null,
      })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: 'An error occurred',
    })
  }
}
