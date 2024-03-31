import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useVerificationMailer } from "../hooks/useVerificationMailer";
import { useNavigate } from "react-router-dom"; // import useNavigate hook

import * as Yup from "yup";

const VerificationMailer = () => {
  const initialValues = {
    email: "",
  };
  const { verificationMailer, error, isLoading } = useVerificationMailer();
  const navigate = useNavigate(); // initialize the navigate function

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);

    try {
      await verificationMailer(values.email);
      navigate('/verification'); // navigate to the verification path upon successful submission
    } catch (error) {
      console.error("Verification email sending failed:", error);
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

export default VerificationMailer;
