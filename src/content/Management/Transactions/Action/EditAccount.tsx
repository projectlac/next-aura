import React from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import { Box } from '@mui/material';

interface IEdit {
  title: string;
}
function EditAccount({ title }: IEdit) {
  const edit = () => {
    console.log('edit');
  };
  return (
    <DialogCommon icon={<EditTwoToneIcon />} title={title} onSubmit={edit}>
      <Box>HUHU</Box>
    </DialogCommon>
  );
}

export default EditAccount;
