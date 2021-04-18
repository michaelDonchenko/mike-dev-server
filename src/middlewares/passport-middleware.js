const passport = require('passport')
const { Strategy } = require('passport-jwt')
const { SECRET } = require('../constants')
const User = require('../models/User')

const cookieExtractor = function (req) {
  let token = null
  if (req && req.cookies) token = req.cookies['token']
  return token
}

const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtractor,
}

passport.use(
  new Strategy(opts, async ({ id }, done) => {
    try {
      let user = await User.findById(id)
      if (!user) {
        throw new Error('User not found.')
      }

      if (user.role !== 'admin') {
        throw new Error('admin access only.')
      }

      return await done(null, user)
    } catch (error) {
      console.log(error.message)
      done(null, false)
    }
  })
)
