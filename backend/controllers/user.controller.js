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

  const { username, password } = req.body;
  
  try {
    const user = await userService.signUp( username, password );

    // create token
    const token = createToken(user.id);

    res.status(200).json({ email, token });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// user verification
const userVerification = async (req, res) => {

  const { email , otp } = req.body;

  try {
    const user = await userService.userVerification( email , otp );

    res.status(200).json({ email, otp });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// verification mailer
const verificationMailer = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userService.verificationMailer( email )

    res.status(200).json({ user });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}



module.exports = { signupUser, loginUser, userVerification, verificationMailer };
