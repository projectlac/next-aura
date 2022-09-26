import { Pagination } from '@mui/material';
import React from 'react';

interface IPaging {
  numberOfPage: number;
  onChange(event: React.ChangeEvent<unknown>, value: number): void;
  index: number;
}
function PaginationPage({ numberOfPage, onChange, index }: IPaging) {
  return (
    <Pagination
      page={index ? index : 1}
      count={numberOfPage}
      onChange={onChange}
      variant="outlined"
      shape="rounded"
      sx={{
        mt: 3,
        '& ul': {
          justifyContent: 'center',
          '& li': {
            '& button': {
              background: '#fff',
              '&.Mui-selected': {
                backgroundColor: 'rgb(96 115 255) !important',
                color: '#fff'
              }
            },
            '& div': {
              background: '#fff',
              border: '1px solid rgba(0, 0, 0, 0.23)',
              height: '31px',
              borderRadius: '10px'
            }
          }
        }
      }}
    />
  );
}

export default PaginationPage;
