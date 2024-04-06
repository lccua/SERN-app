const express = require('express')
// controller functions
const { loginUser, signupUser, otpRequest, verifyOtp } = require('../controllers/user.controller')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// otp verification route
router.post('/otp-verification', verifyOtp)

// otp mailer 
router.post('/otp-request', otpRequest )


module.exports = router