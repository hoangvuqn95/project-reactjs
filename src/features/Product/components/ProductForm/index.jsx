import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from '@material-ui/core';
import InputField from 'components/FormFields/InputField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

ProductForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

ProductForm.defaultProps = {
  initialValues: null,
};

function ProductForm({ initialValues, onSubmit }) {
  const schema = yup.object().shape({
    name: yup.string().required('Please enter name of this product.'),
    salePrice: yup.number().required('Please enter price of this product.'),
    originalPrice: yup.number().required('Please enter price of this product.'),
  });

  const form = useForm({
    mode: 'onBlur',
    defaultValues: initialValues || {
      name: '',
      salePrice: '',
      originalPrice: '',
      picture: '',
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <form noValidate autoComplete="off" onSubmit={form.handleSubmit(handleFormSubmit)}>
      <Typography variant="h5">Product Form</Typography>

      <InputField name="picture" label="Upload picture" type="file" form={form} />

      <InputField name="name" label="Product Name" form={form} />

      <InputField name="salePrice" label="Sale Price" form={form} />

      <InputField name="originalPrice" label="Original Price" form={form} />

      <Button type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </form>
  );
}

export default ProductForm;
