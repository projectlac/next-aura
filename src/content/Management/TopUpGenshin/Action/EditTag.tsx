import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import Selection from '@/components/Common/Form/Selection';
import TextField from '@/components/Common/Form/TextField';
import { useAuth } from '@/contexts/AuthGuard';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Button } from '@mui/material';
import { upRole } from 'api/user';
import { IRoleData } from 'model/user';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

interface IEdit {
  title: string;
  role: string;
  id: number;
}

const validationSchema = yup.object({
  role: yup.string().required('Tên tài khoản is required'),
  bonus: yup.number().min(0).max(100)
});

function EditTag({ title, role, id }: IEdit) {
  const { handleSetMessage, updateSuccess } = useAuth();

  const [initForm, setInitForm] = useState({
    role: '',
    bonus: ''
  });

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const onSubmit = async (value, { resetForm }) => {
    const { role, bonus } = value;
    let param: IRoleData = { role, bonus };
    if (role === 'USER') {
      param = { role };
    }
    // console.log(param);
    try {
      await upRole(id, param).then(() => {
        handleSetMessage({
          type: 'success',
          message: 'Thay đổi role thành công'
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
  useEffect(() => {
    setInitForm({ ...initForm, role: role });
  }, [role, openDialog]);
  return (
    <DialogCommon
      icon={<EditTwoToneIcon />}
      title={title}
      openDialog={openDialog}
      handleOpenDialog={handleOpenDialog}
      handleCloseDialog={handleCloseDialog}
    >
      <FormatForm formik={formik}>
        <Selection
          formik={formik}
          label="Role"
          variant="outlined"
          fullWidth
          name="role"
          sx={{
            my: 2
          }}
          options={[
            { value: 'USER', title: 'Người dùng' },
            { value: 'MOD', title: 'Cộng tác viên' }
          ]}
        />
        {formik.values.role === 'MOD' && (
          <TextField
            sx={{
              mb: 2
            }}
            formik={formik}
            label="Phần trăm cộng tác viên hưởng"
            placeholder=""
            variant="outlined"
            fullWidth
            name="bonus"
            type="number"
          />
        )}
        <Button variant="contained" fullWidth type="submit">
          {formik.isSubmitting ? 'Loading...' : 'UPROLE'}
        </Button>
      </FormatForm>
    </DialogCommon>
  );
}

export default EditTag;
