import React, { useState } from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import { Box } from '@mui/material';

interface IEdit {
  title: string;
}
function EditAccount({ title }: IEdit) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <DialogCommon
      icon={<EditTwoToneIcon />}
      title={title}
      openDialog={openDialog}
      handleOpenDialog={handleOpenDialog}
      handleCloseDialog={handleCloseDialog}
    >
      <Box>HUHU</Box>
    </DialogCommon>
  );
}

export default EditAccount;
