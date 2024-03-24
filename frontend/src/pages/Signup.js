import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const { signup, error, isLoading } = useSignup();

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value) {
          return "Email is required";
        } else if (
          !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)
        ) {
          return "Email is faulty";
        }
        break;
      case "password":
        if (!value) {
          return "Password is required";
        } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)) {
          return "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long";
        }
        break;
      case "confirmPassword":
        if (value !== values.password) {
          return "Passwords do not match";
        }
        break;
      default:
        break;
    }
    return null;
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(errors);

    // Check overall form validity
    const isFormValid = Object.values(errors).every((error) => error === null);
    setFormValid(isFormValid);

    // Call signup function only if the form is valid
    if (formValid) {
      await signup(values.email, values.password);
    }
  };

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    console.log(errors);
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>

        <input
          label="Email"
          name="email"
          type="text"
          placeholder="Email"
          value={values.email}
          onChange={onChange}
          onBlur={handleBlur}
          required
        />
        {errors.email && <div className="error">{errors.email}</div>}

        <input
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={onChange}
          onBlur={handleBlur}
          required
        />
        {errors.password && <div className="error">{errors.password}</div>}

        <input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={values.confirmPassword}
          onChange={onChange}
          onBlur={handleBlur}
          required
        />
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword}</div>
        )}

        <button disabled={isLoading}>Sign up</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
