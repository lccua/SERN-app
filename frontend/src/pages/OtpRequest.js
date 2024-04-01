import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useOtpRequest } from "../hooks/useOtpRequest";
import { useNavigate } from "react-router-dom"; // import useNavigate hook

import * as Yup from "yup";

const OtpRequest = () => {
  const initialValues = {
    email: "",
  };
  const { otpRequest, error, isLoading } = useOtpRequest();
  const navigate = useNavigate(); // initialize the navigate function

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);

    try {
      await otpRequest(values.email);
      navigate('/otp-authentication'); // navigate to the verification path upon successful submission
    } catch (error) {
      console.error("Authentication email sending failed:", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isLoading ? "Sending..." : "Send code"}
            </button>
            {error && <div>{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OtpRequest;
