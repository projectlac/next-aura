import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import { useAuth } from '@/contexts/AuthGuard';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Box, Button, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import {
  editHero,
  editWeapon,
  getHeroBySlug,
  getWeaponBySlug
} from 'api/apiTag/tagApi';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
interface IEdit {
  title: string;
  slug: string;
  type: string;
}
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';

import Image from 'next/image';
const Input = styled('input')({
  display: 'none'
});
function EditTag({ title, slug, type }: IEdit) {
  const theme = useTheme();
  const { handleSetMessage, updateSuccess } = useAuth();
  const [defaultData, setDefaultData] = useState<any>({
    title: '',
    image: ''
  });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>('');
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const validationSchema = yup.object({
    title: yup.string().required('Tên tag là thuộc tính bắt buộc')
  });
  const initForm = {
    title: defaultData.title,
    file: null
  };

  useEffect(() => {
    if (openDialog) {
      if (type === 'weapon') {
        getWeaponBySlug(slug).then((res) =>
          setDefaultData({ title: res.data.desc, image: res?.data?.image?.url })
        );
      } else {
        getHeroBySlug(slug).then((res) =>
          setDefaultData({ title: res.data.desc, image: res?.data?.image?.url })
        );
      }
    } else {
    }
  }, [openDialog]);

  const onSubmit = (value, { resetForm }) => {
    const { title, file } = value;
    const formData = new FormData();
    formData.append('desc', title);
    file && formData.append('file', file);

    if (type === 'weapon') {
      try {
        editWeapon(slug, formData).then(() => {
          handleSetMessage({
            type: 'success',
            message: 'Sửa vũ khí thành công'
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
    } else {
      try {
        editHero(slug, formData).then(() => {
          handleSetMessage({
            type: 'success',
            message: 'Sửa nhân vật thành công'
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
      icon={<EditTwoToneIcon />}
      title={title}
      openDialog={openDialog}
      handleOpenDialog={handleOpenDialog}
      handleCloseDialog={handleCloseDialog}
    >
      <Box>
        <FormatForm formik={formik}>
          <TextField
            formik={formik}
            sx={{ mt: 1, mb: 3 }}
            label="Tên"
            variant="outlined"
            fullWidth
            name="title"
            type="text"
          />
          <Box>
            <Input
              accept="image/*"
              id={`change-avatar-edit-tag-${slug}`}
              type="file"
              name="file"
              onChange={handleFile}
            />
            <label htmlFor={`change-avatar-edit-tag-${slug}`}>
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
            <Box width={150} height={150} mb={3}>
              <Image
                src={preview}
                layout="responsive"
                width={150}
                height={150}
              ></Image>
            </Box>
          ) : (
            <Box sx={{ display: 'flex' }}>
              {defaultData.image && (
                <Box width={150} height={150} mt={3} mb={3}>
                  <Image
                    src={defaultData.image}
                    layout="responsive"
                    width={150}
                    height={150}
                  ></Image>
                </Box>
              )}
            </Box>
          )}
          <Button variant="contained" fullWidth type="submit">
            Sửa
          </Button>
        </FormatForm>
      </Box>
    </DialogCommon>
  );
}

export default EditTag;
