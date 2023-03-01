import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import { useAuth } from '@/contexts/AuthGuard';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Box, Button, Divider, Grid } from '@mui/material';
import { deleteProduct } from 'api/product/productApi';
import { useState } from 'react';

interface IEdit {
  title: string;
  slug: string;
}
function DeleteAccount({ title, slug }: IEdit) {
  const { handleSetMessage, updateSuccess } = useAuth();

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const onSubmit = async () => {
    try {
      await deleteProduct(slug).then(() => {
        handleSetMessage({
          type: 'warning',
          message: 'Xóa sản phẩm thành công'
        });
        handleCloseDialog();

        updateSuccess();
      });
    } catch (error) {
      handleSetMessage({
        type: 'error',
        message: 'Có lỗi xảy ra, kiểm tra lại hoặc liên hệ DEV'
      });
    }
  };
  return (
    <DialogCommon
      icon={<DeleteTwoToneIcon fontSize="small" />}
      title={title}
      openDialog={openDialog}
      handleOpenDialog={handleOpenDialog}
      handleCloseDialog={handleCloseDialog}
    >
      <Box textAlign={'center'}>
        <p>Bạn có chắc muốn xóa tài khoản này?</p>
        <p>Sau khi xóa sẽ không thể hoàn lại</p>
        <Divider sx={{ my: 1 }}></Divider>
        <Grid container>
          <Grid item md={6} xs={12} textAlign="center">
            <Button variant="contained" onClick={onSubmit}>
              Xác nhận
            </Button>
          </Grid>
          <Grid item md={6} xs={12} textAlign="center">
            <Button
              variant="contained"
              color="error"
              onClick={handleCloseDialog}
            >
              Đóng
            </Button>
          </Grid>
        </Grid>
      </Box>
    </DialogCommon>
  );
}

export default DeleteAccount;
