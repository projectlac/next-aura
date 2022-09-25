import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import { useAuth } from '@/contexts/AuthGuard';
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';
import { Button } from '@mui/material';
import { changeMoney, upRole } from 'api/user';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
interface IEdit {
  title: string;

  id: number;
}

const validationSchema = yup.object({
  money: yup.number().required('Số tiền không được để trống')
});

function ChangeCoin({ title, id }: IEdit) {
  const { handleSetMessage, updateSuccess } = useAuth();

  const [initForm, setInitForm] = useState({
    money: 0
  });

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const onSubmit = async (value, { resetForm }) => {
    const { money } = value;

    // console.log(param);
    try {
      await changeMoney(id, money).then(() => {
        handleSetMessage({
          type: 'success',
          message: 'Thay đổi tiền thành công'
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
    setInitForm({ money: 0 });
  }, [openDialog]);
  return (
    <DialogCommon
      icon={<CurrencyExchangeTwoToneIcon />}
      title={title}
      openDialog={openDialog}
      handleOpenDialog={handleOpenDialog}
      handleCloseDialog={handleCloseDialog}
    >
      <FormatForm formik={formik}>
        <TextField
          sx={{
            mY: 2
          }}
          formik={formik}
          label="Cộng trừ tiền"
          placeholder=""
          variant="outlined"
          fullWidth
          name="bonus"
          type="number"
        />
        <p>*Nếu truyền vào giá trị âm, thì có nghĩa là trừ và ngược lại</p>
        <Button variant="contained" fullWidth type="submit">
          {formik.isSubmitting ? 'Loading...' : 'Thực thi'}
        </Button>
      </FormatForm>
    </DialogCommon>
  );
}

export default ChangeCoin;
