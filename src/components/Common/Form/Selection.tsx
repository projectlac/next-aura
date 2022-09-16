import { MenuItem, TextField as TF } from '@mui/material';

function Selection({ formik, name, label, options, ...props }) {
  return (
    <TF
      fullWidth
      name={name}
      label={label}
      select
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      {...props}
    >
      <MenuItem disabled value="">
        Select
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.title}
        </MenuItem>
      ))}
    </TF>
  );
}

export default Selection;
