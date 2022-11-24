import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import Selection from '@/components/Common/Form/Selection';
import TextField from '@/components/Common/Form/TextField';
import { useAuth } from '@/contexts/AuthGuard';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
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

import { getProductBySlug, updateProduct } from 'api/product/productApi';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
interface IEdit {
  title: string;
  slug: string;
}

const Input = styled('input')({
  display: 'none'
});
const validationSchema = yup.object({
  name: yup.string().required('Trường này là bắt buộc'),
  detail: yup.array().of(yup.string()).min(1),
  description: yup.string().required('Trường này là thuộc tính bắt buộc'),
  file: yup.mixed().required('File is required'),
  amount: yup.number().required('Trường này là thuộc tính bắt buộc'),
  category: yup.array().of(yup.string()).min(1)
});

function EditAccount({ title, slug }: IEdit) {
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

  const [defaultData, setDefaultData] = useState<any>({
    name: '',
    detail: [],
    description: '',
    file: null,
    amount: 0,
    category: []
  });

  const handleFile = (e: React.FormEvent<HTMLInputElement>) => {
    if ((e.target as HTMLInputElement).files[0]) {
      const objectUrl = URL.createObjectURL(
        (e.target as HTMLInputElement).files[0]
      );
      setPreview(objectUrl);
      formik.handleChange({
        target: { name: 'file', value: (e.target as HTMLInputElement).files[0] }
      });
    }
  };

  const onSubmit = async (values, { resetForm }) => {
    const { name, description, amount, file } = values;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('amount', amount);

    file && formData.append('avatar', file);

    try {
      await updateProduct(slug, formData).then(() => {
        handleSetMessage({
          type: 'success',
          message: `Sửa sản phẩm thành công`
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

  const initForm = defaultData;
  const formik = useCustomForm(validationSchema, initForm, onSubmit);

  useEffect(() => {
    if (openDialog) {
      getProductBySlug(slug).then((res) => {
        const data = res.data;
        // let temp = {
        //   name: data.name,
        //   username: data.username,
        //   password: data.password,
        //   server: data.server.desc,
        //   detail: data.description,
        //   price: data.price,
        //   ar: data.ar_level,
        //   type: data.type,
        //   avatar: data.avatar.url,

        //   file: null
        // };
        // setDefaultData(temp);
      });
    }
  }, [openDialog]);
  return (
    <DialogCommon
      icon={<EditTwoToneIcon fontSize="small" />}
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
                  id={`change-cover-create-account-normal-${slug}`}
                  type="file"
                  name="file"
                  onChange={handleFile}
                />
                <label htmlFor={`change-cover-create-account-normal-${slug}`}>
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
              {preview ? (
                <Box width={200} height={150}>
                  <Image
                    src={preview}
                    layout="responsive"
                    width={200}
                    height={150}
                  ></Image>
                </Box>
              ) : (
                <Box sx={{ display: 'flex' }}>
                  {defaultData.avatar && (
                    <Box width={200} height={150}>
                      <Image
                        src={defaultData.avatar}
                        layout="responsive"
                        width={200}
                        height={150}
                      ></Image>
                    </Box>
                  )}
                </Box>
              )}
            </Grid>

            <Grid item md={12} xs={12}>
              <Button variant="contained" fullWidth type="submit">
                {formik.isSubmitting ? 'Loading...' : 'Sửa'}
              </Button>
            </Grid>
          </Grid>
        </FormatForm>
      </Box>
    </DialogCommon>
  );
}

export default EditAccount;
