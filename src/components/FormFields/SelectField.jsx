import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

SelectField.defaultProps = {
  label: '',
  disabled: false,
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
}));

function SelectField(props) {
  const classes = useStyles();

  const { name, label, form, disabled, options } = props;
  const { errors } = form;
  const errorMessage = errors[name]?.message;
  const hasError = !!errorMessage;

  return (
    <Box mt={1} mb={2}>
      <FormControl variant="outlined" error={hasError} className={classes.formControl}>
        <InputLabel id={name}>{label}</InputLabel>

        <Controller
          name={name}
          control={form.control}
          render={({ value, onChange, onBlur }) => (
            <Select
              fullWidth
              disabled={disabled}
              labelId={name}
              value={value}
              onChange={onChange}
              label={label}
              onBlur={onBlur}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />

        <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
    </Box>
  );
}

export default SelectField;
