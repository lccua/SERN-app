class UserValidator {
  static validateEmail(email) {
    // Regular expression for validating email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "It should be a valid email address!";
    }
    return null; // No error
  }

  static validatePassword(password, confirmationPassword) {
    console.log();

    // Regular expression for validating password
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    if (!passwordRegex.test(password)) {
      return "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!";
    }

    return null; // No error
  }

  static confirmPassword(password, confirmationPassword) {
    if (password !== confirmationPassword) {
      return "Passwords do not match.";
    }
    return null; // No error
  }
}

export default UserValidator;
