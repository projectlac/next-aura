import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';

import { useAuth } from '@/contexts/AuthGuard';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Box, Button, Grid } from '@mui/material';

import { addCategory } from 'api/category/categoryApi';
import { useState } from 'react';
import * as yup from 'yup';
interface IEdit {
  title: string;
}

const validationSchema = yup.object({
  name: yup.string().required('Tên danh mục là bất buộc')
});
const initForm = {
  name: ''
};

function AddAccount({ title }: IEdit) {
  const { handleSetMessage, updateSuccess } = useAuth();

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const onSubmit = async (values, { resetForm }) => {
    const { name } = values;

    try {
      await addCategory(name).then(() => {
        handleSetMessage({
          type: 'success',
          message: 'Danh mục sản phẩm thành công'
        });
        handleCloseDialog();
        resetForm();
        updateSuccess();
      });
    } catch (error) {
      handleSetMessage({
        type: 'error',
        message: 'Có lỗi xảy ra, vui lòng kiểm tra lại thông tin nhập'
      });
    }
  };
  const formik = useCustomForm(validationSchema, initForm, onSubmit);
  return (
    <DialogCommon
      icon={
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          {title}
        </Button>
      }
      title={title}
      openDialog={openDialog}
      handleOpenDialog={handleOpenDialog}
      handleCloseDialog={handleCloseDialog}
    >
      <Box>
        <FormatForm formik={formik}>
          <Grid container columnSpacing={2} rowSpacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                formik={formik}
                label="Tên danh mục"
                placeholder=""
                variant="outlined"
                fullWidth
                name="name"
                type="text"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <Button variant="contained" fullWidth type="submit">
                {formik.isSubmitting ? 'Loading...' : 'Thêm'}
              </Button>
            </Grid>
          </Grid>
        </FormatForm>
      </Box>
    </DialogCommon>
  );
}

export default AddAccount;
