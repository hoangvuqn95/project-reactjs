import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from '@material-ui/core';
import InputField from 'components/FormFields/InputField';
import PhotoField from 'components/FormFields/PhotoField';
import SelectField from 'components/FormFields/SelectField';
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
    // Product name
    name: yup.string().required('Please enter name of this product.'),
    // sale price
    salePrice: yup
      .number()
      .required('Please enter price of this product.')
      .positive()
      .integer()
      .min(10000, 'Should be greater than or equal to 10000'),
    // original price
    originalPrice: yup
      .number()
      .positive()
      .integer()
      .required('Please enter old price of this product.')
      .test(
        'Old price have to more expensive than sale price',
        'Price must higher 10000',
        (value) => {
          return value >= 10000;
        }
      ),
    picture: yup
      .mixed()
      .required('You need a picture for this product')
      .test('file size', 'This file is so large', (value) => {
        return value && value[0].size < 40000;
      }),
    // Classify product
    classify: yup.string().required('Please chose classify of this product'),
  });

  const { form, register } = useForm({
    mode: 'onBlur',
    defaultValues: initialValues || {
      name: '',
      salePrice: '',
      originalPrice: '',
      picture: '',
      classify: '',
    },
    resolver: yupResolver(schema),
  });

  const pictureUrl = form.watch('picture');
  console.log('picture', pictureUrl);

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <form noValidate autoComplete="off" onSubmit={form.handleSubmit(handleFormSubmit)}>
      <Typography variant="h5">Product Form</Typography>

      <label>Image of product:</label>
      <PhotoField name="picture" type="file" ref={register} label="photo" form={form} />

      <label>Product Name:</label>
      <InputField name="name" label="Product Name" form={form} />

      <label>Sale Price(VND):</label>
      <InputField name="salePrice" type="number" label="Sale Price" form={form} />

      <label>Original Price(VND):</label>
      <InputField name="originalPrice" type="number" label="Original Price" form={form} />

      <label>Classify Product:</label>
      <SelectField
        name="classify"
        label="Classify Product"
        form={form}
        options={[
          { value: 'Laptop', label: 'Laptop' },
          { value: 'Houseware', label: 'Houseware' },
          { value: 'Clothes', label: 'Clothes' },
          { value: 'T-Shirt', label: 'T-Shirt' },
          { value: 'Shirt', label: 'Shirt' },
          { value: 'Pants', label: 'Pants' },
          { value: 'Toy', label: 'Toy' },
          { value: 'Car', label: 'Car' },
          { value: 'Telephone', label: 'Telephone' },
        ]}
      />

      <Button disabled={isSubmitting} type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </form>
  );
}

export default ProductForm;
