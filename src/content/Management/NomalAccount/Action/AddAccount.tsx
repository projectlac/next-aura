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
import { useEffect, useState } from 'react';
import * as yup from 'yup';
// import { createAccountNomal } from 'api/apiAccount/account';
import { useAuth } from '@/contexts/AuthGuard';
import { addProduct } from 'api/product/productApi';
import AutoCompleteHarder from '@/components/Common/Form/AutoCompleteHarder';
import { getCategory } from 'api/category/categoryApi';
import TinyEditor from '@/components/Common/Editor/TinyEditor';
interface IEdit {
  title: string;
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
const initForm = {
  name: '',
  detail: [],
  description: '',
  file: null,
  amount: 0,
  category: []
};

function AddAccount({ title }: IEdit) {
  const { handleSetMessage, updateSuccess } = useAuth();
  const [category, setCategory] = useState([]);
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>('');
  const [trigger, setTrigger] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSelectedCategory = (data: any) => {
    formik.handleChange({ target: { name: 'category', value: data } });
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

  useEffect(() => {
    if (openDialog) {
      getCategory().then((res) => {
        let temp = res.data.map((d) => ({ desc: d.name, slug: d.slug }));
        setCategory(temp);
      });

      setTrigger(true);
    }
  }, [openDialog]);

  const onSubmit = async (values, { resetForm }) => {
    const { name, description, amount, file } = values;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('amount', amount);

    file && formData.append('avatar', file);

    try {
      await addProduct(formData).then(() => {
        handleSetMessage({
          type: 'success',
          message: `Tạo sản phẩm thành công`
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
  const changeContent = (data: string) => {
    formik.handleChange({
      target: { name: 'description', value: data }
    });
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
                label="Tên sản phảm"
                placeholder=""
                variant="outlined"
                fullWidth
                name="name"
                type="text"
              />
            </Grid>

            {/* <Grid item md={6} xs={12}>
              <TextField
                formik={formik}
                label="Số lượng"
                variant="outlined"
                fullWidth
                name="amout"
                type="number"
              />
            </Grid> */}

            <Grid item md={12} xs={12}>
              <TinyEditor changeBody={changeContent} defaultValue={''} />
              {/* <TextField
                formik={formik}
                label="Mô tả"
                placeholder=""
                variant="outlined"
                fullWidth
                name="description"
                type="text"
              /> */}
            </Grid>
            <Grid item md={12} xs={12}>
              <Box>
                <AutoCompleteHarder
                  trigger={trigger}
                  title="Danh sách danh mục sản phẩm"
                  data={category}
                  id="create-vip-weapon"
                  name="category"
                  formik={formik}
                  defaultValue={[]}
                  handleSelected={handleSelectedCategory}
                />
              </Box>
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
