const { config } = require('dotenv')
config()

module.exports = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
  SERVER_URL: process.env.SERVER_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  CLIENT_DOMAIN: process.env.CLIENT_DOMAIN,
  USERNAME: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  SECRET: process.env.SECRET,
}
