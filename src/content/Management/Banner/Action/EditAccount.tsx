import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField as TF,
  Typography
} from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
// import { createAccountNomal } from 'api/apiAccount/account';
import TinyEditor from '@/components/Common/Editor/TinyEditor';
import AutoCompleteHarder from '@/components/Common/Form/AutoCompleteHarder';
import Basic from '@/components/Dropzone/StyledDropzone';
import { useAuth } from '@/contexts/AuthGuard';
import { getCategory } from 'api/category/categoryApi';
import { getProductBySlug, updateProduct } from 'api/product/productApi';
import { Atribute } from 'model/product';
import { getById, update } from 'api/banner/banner';
interface IEdit {
  title: string;
  slug: string;
}

const validationSchema = yup.object({
  name: yup.string().required('Trường này là bắt buộc'),
  file: yup.mixed().notRequired()
});

function EditAccount({ title, slug }: IEdit) {
  const { handleSetMessage, updateSuccess } = useAuth();
  const [category, setCategory] = useState([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [preview, setPreview] = useState<string[]>([]);
  const [trigger, setTrigger] = useState<boolean>(false);

  const [defaultData, setDefaultData] = useState<any>({
    name: '',
    file: null
  });

  const [defaultAtribute, setDefaultAtribute] = useState<Atribute[]>([
    { size: '', price: 0 }
  ]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFile = (file) => {
    let a = file.length > 0 && file.map((d, i) => URL.createObjectURL(d));
    setPreview(a);

    formik.handleChange({
      target: { name: 'file', value: file }
    });
  };

  useEffect(() => {
    if (openDialog) {
      const callApi = async () => {
        await getCategory().then((res) => {
          let temp = res.data.map((d) => ({ desc: d.name, slug: d.slug }));
          setCategory(temp);
        });
        await getById(slug).then((res) => {
          const data = res.data;
          console.log(res.data);

          let temp = {
            name: data.value[0],
            file: null
          };
          let image = data.images[0];
          setPreview(image);
          setDefaultData(temp);
        });
      };
      callApi();
      setTrigger(true);
    }
  }, [openDialog]);

  const initForm = defaultData;

  const onSubmit = async (values, { resetForm }) => {
    const { name, file } = values;

    const formData = new FormData();

    formData.append('value', name);

    file && file.length > 0 && formData.append('files', file[0]);

    try {
      await update(slug, formData).then(() => {
        handleSetMessage({
          type: 'success',
          message: `Sửa banner thành công`
        });
        handleCloseDialog();
        resetForm();

        setPreview([]);
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
      icon={<EditTwoToneIcon />}
      title={title}
      openDialog={openDialog}
      handleOpenDialog={handleOpenDialog}
      handleCloseDialog={handleCloseDialog}
    >
      <Box>
        <FormatForm formik={formik}>
          <Grid container columnSpacing={2} rowSpacing={3}>
            <Grid item md={12} xs={12} sx={{ mt: 1 }}>
              <TextField
                formik={formik}
                label="Tên banner"
                placeholder=""
                variant="outlined"
                fullWidth
                name="name"
                type="text"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <Basic handleFile={handleFile} />
              <Box mt={3} sx={{ display: 'flex', '& div': { marginRight: 1 } }}>
                {preview.length > 0 && (
                  <Box
                    width={200}
                    height={150}
                    sx={{
                      background: `url(${preview})`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat'
                    }}
                  ></Box>
                )}
              </Box>
            </Grid>

            <Grid item md={12} xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                onClick={() => {
                  console.log(formik.errors);
                }}
              >
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
