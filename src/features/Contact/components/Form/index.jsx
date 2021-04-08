import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from '@material-ui/core';
import InputField from 'components/FormFields/InputField';
import RadioField from 'components/FormFields/RadioField';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import SelectField from 'components/FormFields/SelectField';

ContactForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

ContactForm.defaultProps = {
  initialValues: null,
};

function ContactForm({ initialValues, onSubmit }) {
  const schema = yup.object().shape({
    // name
    name: yup.string().required('Please enter your name, thanks!'),
    age: yup.number().required('Please fill your age, thanks!'),
    gender: yup.string(),
    phone: yup.number().required('Please fill exactly your phone number'),
    address: yup
      .mixed()
      .required('Please fill exactly your address for your products are arrived faster!'),
  });

  const form = useForm({
    mode: 'onBlur',
    defaultValues: initialValues || {
      name: '',
      gender: 'Male',
      age: '',
      phone: '',
      city: '',
      address: '',
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
    <div>
      <form noValidate autoComplete="off" onSubmit={form.handleSubmit(handleFormSubmit)}>
        <Typography variant="h2">Contact form</Typography>

        <label>Your name:</label>
        <InputField name="name" label="Your Name" form={form} />

        <label>Your age:</label>
        <InputField name="age" label="Your Age" type="number" form={form} />

        <label>Gender:</label>
        <RadioField
          name="gender"
          label="Gender"
          form={form}
          options={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
          ]}
        />

        <label>Your phone:</label>
        <InputField name="phone" label="Phone Number" type="number" form={form} />

        <label>Your address:</label>
        <InputField name="address" label="Address" form={form} />

        <label>City:</label>
        <SelectField
          name="city"
          label="City"
          form={form}
          options={[
            { label: 'An Giang', value: 'An Giang' },
            { label: 'Bà Rịa - Vũng Tàu', value: 'Bà Rịa - Vũng Tàu' },
            { label: 'Bắc Giang', value: 'Bắc Giang' },
            { label: 'Bắc Kạn', value: 'Bắc Kạn' },
            { label: 'Bạc Liêu', value: 'Bạc Liêu' },
            { label: 'Bắc Ninh', value: 'Bắc Ninh' },
            { label: 'Bến Tre', value: 'Bến Tre' },
            { label: 'Bình Định', value: 'Bình Định' },
            { label: 'Bình Dương', value: 'Bình Dương' },
            { label: 'Bình Phước', value: 'Bình Phước' },
            { label: 'Bình Thuận', value: 'Bình Thuận' },
            { label: 'Cà Mau', value: 'Cà Mau' },
            { label: 'Cao Bằng', value: 'Cao Bằng' },
            { label: 'Đắk Lắk', value: 'Đắk Lắk' },
            { label: 'Đắk Nông', value: 'Đắk Nông' },
            { label: 'Điện Biên', value: 'Điện Biên' },
            { label: 'Đồng Nai', value: 'Đồng Nai' },
            { label: 'Đồng Tháp', value: 'Đồng Tháp' },
            { label: 'Gia Lai', value: 'Gia Lai' },
            { label: 'Hà Giang', value: 'Hà Giang' },
            { label: 'Hà Nam', value: 'Hà Nam' },
            { label: 'Hà Tĩnh', value: 'Hà Tĩnh' },
            { label: 'Hải Dương', value: 'Hải Dương' },
            { label: 'Hậu Giang', value: 'Hậu Giang' },
            { label: 'Hòa Bình', value: 'Hòa Bình' },
            { label: 'Hưng Yên', value: 'Hưng Yên' },
            { label: 'Khánh Hòa', value: 'Khánh Hòa' },
            { label: 'Kiên Giang', value: 'Kiên Giang' },
            { label: 'Kon Tum', value: 'Kon Tum' },
            { label: 'Lai Châu', value: 'Lai Châu' },
            { label: 'Lâm Đồng', value: 'Lâm Đồng' },
            { label: 'Lạng Sơn', value: 'Lạng Sơn' },
            { label: 'Lào Cai', value: 'Lào Cai' },
            { label: 'Long An', value: 'Long An' },
            { label: 'Nam Định', value: 'Nam Định' },
            { label: 'Nghệ An', value: 'Nghệ An' },
            { label: 'Ninh Bình', value: 'Ninh Bình' },
            { label: 'Ninh Thuận', value: 'Ninh Thuận' },
            { label: 'Phú Thọ', value: 'Phú Thọ' },
            { label: 'Quảng Bình', value: 'Quảng Bình' },
            { label: 'Quảng Nam', value: 'Quảng Nam' },
            { label: 'Quảng Ngãi', value: 'Quảng Ngãi' },
            { label: 'Quảng Ninh', value: 'Quảng Ninh' },
            { label: 'Quảng Trị', value: 'Quảng Trị' },
            { label: 'Sóc Trăng', value: 'Sóc Trăng' },
            { label: 'Sơn La', value: 'Sơn La' },
            { label: 'Tây Ninh', value: 'Tây Ninh' },
            { label: 'Thái Bình', value: 'Thái Bình' },
            { label: 'Thái Nguyên', value: 'Thái Nguyên' },
            { label: 'Thanh Hóa', value: 'Thanh Hóa' },
            { label: 'Thừa Thiên Huế', value: 'Thừa Thiên Huế' },
            { label: 'Tiền Giang', value: 'Tiền Giang' },
            { label: 'Trà Vinh', value: 'Trà Vinh' },
            { label: 'Tuyên Quang', value: 'Tuyên Quang' },
            { label: 'Vĩnh Long', value: 'Vĩnh Long' },
            { label: 'Vĩnh Phúc', value: 'Vĩnh Phúc' },
            { label: 'Yên Bái', value: 'Yên Bái' },
            { label: 'Phú Yên', value: 'Phú Yên' },
            { label: 'Cần Thơ', value: 'Cần Thơ' },
            { label: 'Đà Nẵng', value: 'Đà Nẵng' },
            { label: 'Hải Phòng', value: 'Hải Phòng' },
            { label: 'Hà Nội', value: 'Hà Nội' },
            { label: 'TP HCM', value: 'TP HCM' },
          ]}
        />

        <Button disabled={isSubmitting} type="submit" color="primary" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ContactForm;
