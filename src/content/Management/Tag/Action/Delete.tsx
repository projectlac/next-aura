import React, { useState } from 'react';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import { Box } from '@mui/material';

interface IEdit {
  title: string;
}
function EditTag({ title }: IEdit) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <DialogCommon
      icon={<DeleteTwoToneIcon />}
      title={title}
      openDialog={openDialog}
      handleOpenDialog={handleOpenDialog}
      handleCloseDialog={handleCloseDialog}
    >
      <Box>HUHU</Box>
    </DialogCommon>
  );
}

export default EditTag;
