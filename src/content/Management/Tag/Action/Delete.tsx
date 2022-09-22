import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import { useAuth } from '@/contexts/AuthGuard';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Box, Button, Divider, Grid } from '@mui/material';
import { deleteHero, deleteWeapon } from 'api/apiTag/tagApi';
import { useState } from 'react';

interface IEdit {
  title: string;
  slug: string;
  type: string;
}
function EditTag({ title, slug, type }: IEdit) {
  const { handleSetMessage, updateSuccess } = useAuth();

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const onSubmit = () => {
    if (type === 'weapon') {
      try {
        deleteWeapon(slug).then(() => {
          handleSetMessage({
            type: 'warning',
            message: 'Xóa vũ khí thành công'
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
    } else {
      try {
        deleteHero(slug).then(() => {
          handleSetMessage({
            type: 'warning',
            message: 'Xóa nhân vật thành công'
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
    }
  };
  return (
    <DialogCommon
      icon={<DeleteTwoToneIcon />}
      title={title}
      openDialog={openDialog}
      handleOpenDialog={handleOpenDialog}
      handleCloseDialog={handleCloseDialog}
    >
      <Box textAlign={'center'}>
        <p>Bạn có chắc muốn xóa tag này?</p>
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

export default EditTag;
