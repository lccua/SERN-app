import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useOtpRequest } from "../../hooks/verification/useOtpRequest";

import * as Yup from "yup";

const OtpRequest = ({handleOtpRequest, isNewUser}) => {

  const { otpRequest, error, isLoading } = useOtpRequest();

  const handleSubmit = async ( values, { setSubmitting }) => {

    setSubmitting(false);

    try {

      const isRequested = await otpRequest(values.email, isNewUser);
      
      if (isRequested){
        handleOtpRequest(values.email, isRequested);
      }

    } catch (error) {
      console.log(error)
    }

    
  };

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

 

  return (
    <div>
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
