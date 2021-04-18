const { Router } = require('express')
const { login, logout } = require('../controllers/auth')
const { userAuth } = require('../middlewares/auth-middleware')

const router = Router()

router.post('/login', login)
router.post('/logout', userAuth, logout)

module.exports = router
