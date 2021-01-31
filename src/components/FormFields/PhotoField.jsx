import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

PhotoField.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  // Type dung` cho input nhap so'
  type: PropTypes.string,
  // defaultValues dung` cho input 1 array
  // defaultValues: PropTypes.array,
};

PhotoField.defaultProps = {
  label: '',
  disabled: false,
  type: 'text',
  // defaultValues: [],
};

function PhotoField(props) {
  const { name, label, form, disabled, type } = props;
  const { errors } = form;
  const errorMessage = errors[name]?.message;
  const hasError = !!errorMessage;

  // const handleChange = (e) => {
  //   const file = e.target.files[0];
  //   const storageRef = app.storage().ref();
  //   const fileRef = storageRef.child(file.name);
  //   //--------- const fileRef = storageRef.child(e.target.files[0].name) ------------------
  //   fileRef.put(file).then(() => {
  //     console.log('Upload a file');
  //   });
  // };
  return (
    <Box mt={1} mb={2}>
      <Controller
        name={name}
        control={form.control}
        render={({ value, onChange, onBlur }) => (
          <TextField
            fullWidth
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
            disabled={disabled}
            variant="outlined"
            error={hasError}
            helperText={errorMessage}
          />
        )}
      />
    </Box>
  );
}

export default PhotoField;
