import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from '@material-ui/core';
import InputField from 'components/FormFields/InputField';
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

    // images: yup.array().of(
    //   yup.object().shape({
    //     picture: yup
    //       .mixed()
    //       .required('You need a picture for this product')
    //       .test('File size', 'This file is so large(<4mb)', (value) => {
    //         return value && value[0].size < 40000;
    //       }),
    //   })
    // ),

    // Classify product - Loai san pham
    categoryId: yup.string().required('Please chose categories of this product'),
  });

  const form = useForm({
    mode: 'onBlur',
    defaultValues: initialValues || {
      name: '',
      salePrice: '',
      originalPrice: '',
      // images: [],
      categoryId: '',
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  // when data is sending to api, for dodge and limit user click many time Submit button make error for system.
  const { isSubmitting } = form.formState;

  return (
    <form noValidate autoComplete="off" onSubmit={form.handleSubmit(handleFormSubmit)}>
      <Typography variant="h5" style={{ textAlign: 'center' }}>
        Product Form
      </Typography>

      <label>Product Name:</label>
      <InputField name="name" label="Product Name" form={form} />

      <label>Sale Price(VND):</label>
      <InputField name="salePrice" type="number" label="Sale Price" form={form} />

      <label>Original Price(VND):</label>
      <InputField name="originalPrice" type="number" label="Original Price" form={form} />

      <label>Categories:</label>
      <SelectField
        name="categoryId"
        label="Category Product"
        form={form}
        options={[
          { label: 'Clothes', value: 'c45eca94-70ef-4264-8714-df482e3d0eff' },
          { label: 'Mask', value: '3ab235d3-7b26-49ad-a5c1-0d4b2f91056e' },
          { label: 'Esthetics', value: '641710c1-5db5-4651-8fad-58ae8f7c7a34' },
          { label: 'Laptop', value: '7922f29f-32eb-4e88-bde8-c283a26da4ba' },
          { label: 'Disk Technology', value: 'ea0cfab5-ecac-48fc-a84a-16e869c37620' },
          { label: 'Telephone', value: 'b4fce5af-d6d5-4438-876d-a7d436087097' },
        ]}
      />

      <Button disabled={isSubmitting} type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </form>
  );
}

export default ProductForm;
