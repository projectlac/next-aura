import React from 'react';
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';
import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import { Box } from '@mui/material';

interface IEdit {
  title: string;
}
function ChangeCoin({ title }: IEdit) {
  const edit = () => {
    console.log('edit');
  };
  return (
    <DialogCommon
      icon={<CurrencyExchangeTwoToneIcon fontSize="small" />}
      title={title}
      onSubmit={edit}
    >
      <Box>HUHU</Box>
    </DialogCommon>
  );
}

export default ChangeCoin;
