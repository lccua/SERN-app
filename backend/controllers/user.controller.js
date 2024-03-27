const userService = require("../services/user.service");
const { createToken } = require("../helpers/jwtToken.helper");




// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await userService.login(email, password);

    // create token
    const token = createToken(user.id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {

  const { email, password } = req.body;
  
  try {
    const user = await userService.signUp( email, password );

    // create token
    const token = createToken(user.id);

    res.status(200).json({ email, token });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// otp verificiaton
const otpVerification = async (req, res) => {

  const { userId, insertedOtp } = req.body;
  
  try {
    const otp = await userService.otpVerification( userId, insertedOtp );

    res.status(200).json({ email, token });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



module.exports = { signupUser, loginUser, otpVerification };
