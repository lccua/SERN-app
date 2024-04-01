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

  const { email, username, password, userAuthenticationId } = req.body;
  
  try {
    console.log("testing singup")
    const user = await userService.signUp( email, username, password, userAuthenticationId );

    // create token
    const token = createToken(user.id);

    res.status(200).json({ email, token });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// user authentication
const verifyOtp = async (req, res) => {

  const { email , otp } = req.body;

  try {
    const user = await userService.verifyOtp( email , otp );

    res.status(200).json({ email, otp });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// verification mailer
const otpRequest = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userService.otpRequest( email )

    res.status(200).json({ user });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}



module.exports = { signupUser, loginUser, otpRequest, verifyOtp };
