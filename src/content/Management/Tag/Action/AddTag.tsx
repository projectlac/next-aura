import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import { useAuth } from '@/contexts/AuthGuard';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  styled,
  useTheme
} from '@mui/material';
import { createHero, createWeapon } from 'api/apiTag/tagApi';
import { useState } from 'react';
import * as yup from 'yup';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import Image from 'next/image';

interface IEdit {
  title: string;
}

const Input = styled('input')({
  display: 'none'
});

const validationSchema = yup.object({
  title: yup.string().required('Tên tag là thuộc tính bắt buộc'),
  type: yup.string().required('Loại tag là thuộc tính bắt buộc')
});

const initForm = {
  title: '',
  type: 'weapon',
  file: null
};

function AddTag({ title }: IEdit) {
  const theme = useTheme();
  const { handleSetMessage, updateSuccess } = useAuth();
  const [preview, setPreview] = useState<string>('');
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const onSubmit = (value, { resetForm }) => {
    const { title, file, type } = value;
    const formData = new FormData();
    formData.append('desc', title);
    file && formData.append('file', file);
    if (type === 'weapon') {
      try {
        createWeapon(formData).then(() => {
          handleSetMessage({
            type: 'success',
            message: 'Thêm vũ khí thành công'
          });
          handleCloseDialog();
          resetForm();
          (
            document.getElementById(
              'change-cover-create-tag'
            ) as HTMLInputElement
          ).value = '';
          updateSuccess();
        });
      } catch (error) {
        handleSetMessage({
          type: 'error',
          message: 'Có lỗi xảy ra, kiểm tra lại hoặc liên hệ DEV'
        });
      }
    } else {
      try {
        createHero(formData).then(() => {
          handleSetMessage({
            type: 'success',
            message: 'Thêm nhân vật thành công'
          });
          handleCloseDialog();
          resetForm();
          updateSuccess();
        });
      } catch (error) {
        handleSetMessage({
          type: 'error',
          message: 'Có lỗi xảy ra, kiểm tra lại hoặc liên hệ DEV'
        });
      }
    }
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
            sx={{ mt: 1 }}
            label="Tên"
            variant="outlined"
            fullWidth
            name="title"
            type="text"
          />
          <FormControl sx={{ my: 3 }}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Loại tag
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
                value="weapon"
                control={<Radio />}
                label="Vũ khí"
              />
              <FormControlLabel
                value="hero"
                control={<Radio />}
                label="Nhân vật"
              />
            </RadioGroup>
          </FormControl>

          <Box mb={3}>
            <Input
              accept="image/*"
              id="change-cover-create-tag"
              type="file"
              name="file"
              onChange={handleFile}
            />
            <label htmlFor="change-cover-create-tag">
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
            <Box width={150} height={150} mb={3}>
              <Image
                src={preview}
                layout="responsive"
                width={150}
                height={150}
              ></Image>
            </Box>
          )}

          <Button variant="contained" fullWidth type="submit">
            Thêm
          </Button>
        </FormatForm>
      </Box>
    </DialogCommon>
  );
}

export default AddTag;
