import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const validatePhoneNumber = (value, countryCode) => {
  if (!value || !countryCode) return false;
  const phoneNumber = parsePhoneNumberFromString(`+${countryCode}${value}`);
  return phoneNumber ? phoneNumber.isValid() : false;
};

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
    phoneNumber: Yup.string()
    .required('Required')
    .test('valid-phone-number', 'Invalid phone number', function (value) {
      const { countryCode } = this.parent;
      return validatePhoneNumber(value, countryCode);
    }),
});




const MyForm = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phoneNumber: '',
        countryCode: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        console.log('Submitted values:', values);
      }}
    >
      {({ errors, touched, setFieldValue, values }) => (
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field name="name" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <PhoneInput
              country={'us'}
              value={values.phoneNumber}
              onChange={(phone, countryData) => {
                setFieldValue('phoneNumber', phone);
                setFieldValue('countryCode', countryData.dialCode);
              }}
            />
            {errors.phoneNumber && touched.phoneNumber ? <div>{errors.phoneNumber}</div> : null}
            {errors.countryCode && touched.countryCode ? <div>{errors.countryCode}</div> : null}
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
