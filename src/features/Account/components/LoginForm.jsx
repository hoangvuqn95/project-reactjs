import PropTypes from 'prop-types';
import React from 'react';
import * as yup from 'yup';

LoginForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  initialValues: null,
};

function LoginForm({ initialValues, onSubmit }) {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Please enter your login name.')
      .test('Please enter more 12 characters', 'Login name do not have space', (value) => {
        return (value.split(' ').filter((x) => x.length >= 12).length = 0);
      }),
  });
  return <div></div>;
}

export default LoginForm;
