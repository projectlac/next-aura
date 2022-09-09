import { useFormik } from 'formik';

const useCustomForm = (yupBuilder, initialValues, onSubmit) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yupBuilder,
    onSubmit: onSubmit
  });
  return formik;
};
export default useCustomForm;
