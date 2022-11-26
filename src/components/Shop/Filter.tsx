import { Box, Typography } from '@mui/material';
import React from 'react';
// import { ICategoryData } from "~/models/category";

interface IProps {
  category: any;
}
function Filter({ category }: IProps) {
  return (
    <div>
      <Typography
        sx={{
          fontSize: '15px',
          fontWeight: 'bold',
          marginBottom: '19px',
          textTransform: 'uppercase'
        }}
      >
        Phân loại sản phẩm
      </Typography>
      <Box
        sx={{
          '& ul': {
            padding: '0'
          },
          '& li': {
            marginBottom: '15px',
            color: '#807C78',
            fontWeight: '400',
            fontSize: '15px'
          }
        }}
      >
        <ul>
          {category.length > 0 &&
            category.map((d) => (
              <li key={d._id}>
                {d.name} ({d.total_product})
              </li>
            ))}
        </ul>
      </Box>
    </div>
  );
}

export default Filter;
