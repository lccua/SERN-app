const express = require('express')
// controller functions
const { loginUser, signupUser, otpVerification } = require('../controllers/user.controller')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// otp verification route
router.post('/verification', otpVerification)


module.exports = router