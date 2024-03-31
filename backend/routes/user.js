const express = require('express')
// controller functions
const { loginUser, signupUser, userVerification, verificationMailer } = require('../controllers/user.controller')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.patch('/signup', signupUser)

// otp verification route
router.post('/verification', userVerification)

// otp mailer 
router.post('/mail-verification', verificationMailer )


module.exports = router