import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import { useAuth } from '@/contexts/AuthGuard';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Box, Button, Grid } from '@mui/material';
import { getCategoryBySlug, updateCategory } from 'api/category/categoryApi';

import { useEffect, useState } from 'react';
import * as yup from 'yup';
interface IEdit {
  title: string;
  slug: string;
}

const validationSchema = yup.object({
  name: yup.string().required('Tên tài khoản is required')
});

function EditAccout({ title, slug }: IEdit) {
  const { handleSetMessage, updateSuccess } = useAuth();

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [defaultData, setDefaultData] = useState<any>({
    name: ''
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const callApi = async () => {
      await getCategoryBySlug(slug).then((res) => {
        const data = res.data;
        let temp = {
          name: data.name
        };
        setDefaultData(temp);
      });
    };
    if (openDialog) {
      callApi();
    }
  }, [openDialog]);
  const onSubmit = async (values, { resetForm }) => {
    const { name } = values;
    try {
      await updateCategory(slug, name).then(() => {
        handleSetMessage({
          type: 'success',
          message: 'Sửa danh mục thành công thành công'
        });
        handleCloseDialog();
        resetForm();
        updateSuccess();
      });
    } catch (error) {
      handleSetMessage({
        type: 'error',
        message: error.response.data.message
      });
    }
  };

  const initForm = defaultData;

  const formik = useCustomForm(validationSchema, initForm, onSubmit);
  return (
    <DialogCommon
      icon={<EditTwoToneIcon />}
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
                {formik.isSubmitting ? 'Loading...' : 'Sửa '}
              </Button>
            </Grid>
          </Grid>
        </FormatForm>
      </Box>
    </DialogCommon>
  );
}

export default EditAccout;
