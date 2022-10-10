import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import Selection from '@/components/Common/Form/Selection';
import TextField from '@/components/Common/Form/TextField';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  useTheme
} from '@mui/material';
import { styled } from '@mui/styles';
import Image from 'next/image';
import { useState } from 'react';
import * as yup from 'yup';
import { createAccountNomal } from 'api/apiAccount/account';
import { useAuth } from '@/contexts/AuthGuard';
interface IEdit {
  title: string;
}

const Input = styled('input')({
  display: 'none'
});
const validationSchema = yup.object({
  name: yup.string().required('Trường này là bắt buộc'),
  username: yup.string().required('Trường này là bắt buộc'),
  password: yup.string().required('Password là thuộc tính bắt buộc'),
  ar: yup.string().required('AR là thuộc tính bắt buộc'),
  type: yup.string().required('Loại tài khoản là thuộc tính bắt buộc'),
  file: yup.mixed().required('File is required'),
  price: yup.number().required('Thông tin này là bắt buộc')
});
const initForm = {
  name: '',
  username: '',
  password: '',
  server: 'ASIA',
  detail: '',
  price: 0,
  ar: 10,
  type: 'REROLL',
  file: null
};

function AddAccount({ title }: IEdit) {
  const { handleSetMessage, updateSuccess } = useAuth();

  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>('');

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFile = (e: React.FormEvent<HTMLInputElement>) => {
    const objectUrl = URL.createObjectURL(
      (e.target as HTMLInputElement).files[0]
    );
    setPreview(objectUrl);
    formik.handleChange({
      target: { name: 'file', value: (e.target as HTMLInputElement).files[0] }
    });
  };

  const onSubmit = async (values, { resetForm }) => {
    const { name, username, password, server, detail, price, ar, type, file } =
      values;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('server', server);
    formData.append('description', detail);
    formData.append('price', price);
    formData.append('ar_level', ar);
    formData.append('type', type);

    file && formData.append('avatar', file);

    try {
      await createAccountNomal(formData).then(() => {
        handleSetMessage({
          type: 'success',
          message: `Tạo tài khoản ${type} thành công`
        });
        handleCloseDialog();
        resetForm();
        (
          document.getElementById(
            'change-cover-create-account-vip-nomarl'
          ) as HTMLInputElement
        ).value = '';
        setPreview('');
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
                label="Tiêu đê"
                placeholder=""
                variant="outlined"
                fullWidth
                name="name"
                type="text"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                formik={formik}
                label="Tài khoản"
                placeholder=""
                variant="outlined"
                fullWidth
                name="username"
                type="text"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                formik={formik}
                label="Mật khẩu"
                variant="outlined"
                fullWidth
                name="password"
                type="text"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                formik={formik}
                label="Chi tiết tài khoản"
                variant="outlined"
                fullWidth
                name="detail"
                type="text"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                formik={formik}
                label="Ar"
                variant="outlined"
                fullWidth
                name="ar"
                type="text"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Selection
                formik={formik}
                label="Server"
                variant="outlined"
                fullWidth
                name="server"
                options={[
                  { value: 'ASIA', title: 'Asia' },
                  { value: 'AMERICA', title: 'America' },
                  { value: 'EUROPE', title: 'Europe' },
                  { value: 'TW-HK-MO', title: 'TW-HK-MO' }
                ]}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                formik={formik}
                label="Giá"
                variant="outlined"
                fullWidth
                name="price"
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Loại acc
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="type"
                  value={formik.values.type}
                  onChange={(event) => {
                    formik.handleChange({
                      target: {
                        name: 'type',
                        value: event.target.value
                      }
                    });
                  }}
                >
                  <FormControlLabel
                    value="REROLL"
                    control={<Radio />}
                    label="Reroll"
                  />
                  <FormControlLabel
                    value="RANDOM"
                    control={<Radio />}
                    label="Random"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box>
                <Input
                  accept="image/*"
                  id="change-cover-create-account-vip-nomarl"
                  type="file"
                  name="file"
                  onChange={handleFile}
                />
                <label htmlFor="change-cover-create-account-vip-nomarl">
                  <Button
                    startIcon={<UploadTwoToneIcon />}
                    variant="contained"
                    component="span"
                    sx={{
                      background: Boolean(formik.errors.file)
                        ? theme.colors.error.main
                        : theme.colors.primary.main
                    }}
                  >
                    Upload avatar
                  </Button>
                </label>
              </Box>
              {preview && (
                <Box width={200} height={150}>
                  <Image
                    src={preview}
                    layout="responsive"
                    width={200}
                    height={150}
                  ></Image>
                </Box>
              )}
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
