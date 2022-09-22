import { useFormik } from 'formik';

const useCustomForm = (yupBuilder, initialValues, onSubmit) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yupBuilder,
    onSubmit: onSubmit,
    enableReinitialize: true
  });
  return formik;
};
export default useCustomForm;
