import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import Selection from '@/components/Common/Form/Selection';
import TextField from '@/components/Common/Form/TextField';
import { useAuth } from '@/contexts/AuthGuard';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Autocomplete, Button, TextField as MuiTextField } from '@mui/material';
import { upRole } from 'api/user';
import { IRoleData } from 'model/user';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

interface IEdit {
  title: string;
  role: string;
  id: number;
  bonus: number | null;
  type: string | null;
}

const validationSchema = yup.object({
  role: yup.string().required('Chức vụ is required'),
  bonus: yup.number().when('role', {
    is: (val) => val == 'MOD',
    then: (schema) => schema.required('% là bắt buộc').min(0).max(100),
    otherwise: (schema) => schema.notRequired()
  }),

  type: yup.string().when('role', {
    is: (val) => val == 'MOD',
    then: (schema) => schema.required('Loại acc là bắt buộc'),
    otherwise: (schema) => schema.notRequired()
  })
});

function EditTag({ title, role, id, bonus, type }: IEdit) {
  const { handleSetMessage, updateSuccess } = useAuth();
  const [value, setValue] = useState<string[]>([]);
  const [initForm, setInitForm] = useState({
    role: '',
    bonus: 0,
    type: ''
  });

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const setAccType = (data: string[]) => {
    formik.handleChange({ target: { name: 'type', value: data.toString() } });
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const onSubmit = async (value, { resetForm }) => {
    const { role, bonus, type } = value;
    let param: IRoleData = { role, bonus, account_type: type };
    if (role === 'USER') {
      param = { role };
    }

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
    setInitForm({
      ...initForm,
      role: role,
      type: type,
      bonus: bonus ? bonus : 0
    });
    setValue(type?.split(','));
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
          <>
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
              InputLabelProps={{ shrink: true }}
            />
            <Autocomplete
              sx={{
                mb: 2
              }}
              multiple
              value={value}
              onChange={(event: any, newValue: any) => {
                console.log(event.type);
                setValue(newValue);
                setAccType(newValue);
              }}
              options={['VIP', 'REROLL', 'RANDOM']}
              renderInput={(params) => (
                <MuiTextField
                  {...params}
                  label="Loại acc có thể đăng"
                  name="type"
                  error={formik.touched.type && Boolean(formik.errors.type)}
                />
              )}
            />
          </>
        )}
        <Button variant="contained" fullWidth type="submit">
          {formik.isSubmitting ? 'Loading...' : 'UPROLE'}
        </Button>
      </FormatForm>
    </DialogCommon>
  );
}

export default EditTag;
