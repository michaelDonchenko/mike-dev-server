const { Router } = require('express')
const { userAuth } = require('../middlewares/auth-middleware')
const { getMessages, newMessage } = require('../controllers/message')

const router = Router()

router.post('/message', newMessage)
router.get('/messages', userAuth, getMessages)

module.exports = router
