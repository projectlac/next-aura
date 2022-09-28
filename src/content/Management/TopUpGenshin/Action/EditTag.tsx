import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import Selection from '@/components/Common/Form/Selection';
import { useAuth } from '@/contexts/AuthGuard';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { Button } from '@mui/material';
import { changeStatusDeposit } from 'api/apiDeposit/account';
import { useState } from 'react';
import * as yup from 'yup';
interface IEdit {
  title: string;

  id: number;
}

const validationSchema = yup.object({
  status: yup.string().required('Trạng thái không được để trống')
});

function EditTag({ title, id }: IEdit) {
  const { handleSetMessage, updateSuccess } = useAuth();

  const initForm = {
    status: 'SUCCESS'
  };

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const onSubmit = async (value, { resetForm }) => {
    const { status } = value;

    try {
      await changeStatusDeposit(id, status).then(() => {
        handleSetMessage({
          type: 'success',
          message: 'Thay đổi trạng thái thành công'
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

  return (
    <DialogCommon
      icon={<SettingsSuggestIcon />}
      title={title}
      openDialog={openDialog}
      handleOpenDialog={handleOpenDialog}
      handleCloseDialog={handleCloseDialog}
    >
      <FormatForm formik={formik}>
        <Selection
          formik={formik}
          label="Thay đổi trạng thái"
          variant="outlined"
          fullWidth
          name="status"
          sx={{
            my: 2
          }}
          options={[
            { value: 'SUCCESS', title: 'Hoàn thành' },
            { value: 'ERROD', title: 'Lỗi' }
          ]}
        />

        <Button variant="contained" fullWidth type="submit">
          {formik.isSubmitting ? 'Loading...' : 'Đổi trạng thái'}
        </Button>
      </FormatForm>
    </DialogCommon>
  );
}

export default EditTag;
