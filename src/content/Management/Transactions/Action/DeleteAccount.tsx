import React from 'react';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import { Box } from '@mui/material';

interface IEdit {
  title: string;
}
function DeleteAccount({ title }: IEdit) {
  const edit = () => {
    console.log('edit');
  };
  return (
    <DialogCommon
      icon={<DeleteTwoToneIcon fontSize="small" />}
      title={title}
      onSubmit={edit}
    >
      <Box>HUHU</Box>
    </DialogCommon>
  );
}

export default DeleteAccount;
