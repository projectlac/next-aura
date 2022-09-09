import { TextField as TF } from '@mui/material';

import React from 'react';

function TextField({ formik, type, name, label, ...props }) {
  return (
    <TF
      fullWidth
      type={type}
      name={name}
      label={label}
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      {...props}
    />
  );
}

export default TextField;
