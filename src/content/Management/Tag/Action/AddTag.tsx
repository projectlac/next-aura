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
  RadioGroup
} from '@mui/material';
import { createHero, createWeapon } from 'api/apiTag/tagApi';
import { useState } from 'react';
import * as yup from 'yup';
interface IEdit {
  title: string;
}

const validationSchema = yup.object({
  title: yup.string().required('Tên tag là thuộc tính bắt buộc'),
  type: yup.string().required('Loại tag là thuộc tính bắt buộc')
});
const initForm = {
  title: '',
  type: 'weapon'
};

function AddTag({ title }: IEdit) {
  const { handleSetMessage, updateSuccess } = useAuth();

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const onSubmit = (value, { resetForm }) => {
    const { title, type } = value;
    if (type === 'weapon') {
      try {
        createWeapon(title).then(() => {
          handleSetMessage({
            type: 'success',
            message: 'Thêm vũ khí thành công'
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
        createHero(title).then(() => {
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
          <Button variant="contained" fullWidth type="submit">
            Thêm
          </Button>
        </FormatForm>
      </Box>
    </DialogCommon>
  );
}

export default AddTag;
