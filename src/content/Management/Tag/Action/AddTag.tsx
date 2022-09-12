import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import * as yup from 'yup';
interface IEdit {
  title: string;
}

const validationSchema = yup.object({
  username: yup.string().required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required')
});
const initForm = {
  username: '',
  password: ''
};
const onSubmit = () => {
  console.log('submit?');
};
function AddTag({ title }: IEdit) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
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
          <TextField
            formik={formik}
            label="Tài khoản"
            variant="outlined"
            fullWidth
            name="username"
            type="text"
          />
          <TextField
            formik={formik}
            sx={{ mt: 3 }}
            id="outlined-basic"
            label="Mật khẩu"
            variant="outlined"
            fullWidth
            name="password"
            type="password"
          />

          <Button variant="contained" fullWidth type="submit">
            Thêm
          </Button>
        </FormatForm>
      </Box>
    </DialogCommon>
  );
}

export default AddTag;
