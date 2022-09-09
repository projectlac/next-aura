import { IFormatForm } from 'model/form';

function FormatForm({ formik, children }: IFormatForm) {
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>{children}</form>
    </div>
  );
}

export default FormatForm;
