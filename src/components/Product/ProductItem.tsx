import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import { IProduct } from 'model/product';
import React from 'react';
import DialogHome from '../Dialog/DialogHome';
interface IProp {
  data: IProduct;
}
function ProductItem({ data }: IProp) {
  const [age, setAge] = React.useState(data.detail[0].size);
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <Box
      sx={{
        '& .submit': {
          background: '#333',
          fontFamily: 'Roboto,sans-serif',
          fontWeight: '400',
          color: '#fff',
          display: 'inline-block',
          textAlign: 'center',
          lineHeight: 'normal',
          padding: '15px 20px',
          borderRadius: '2px',
          border: 'none',
          marginTop: '16px'
        },
        '& .MuiInputBase-root': {
          height: '35px'
        }
      }}
    >
      <Box
        sx={{
          position: 'relative',
          '&:hover': {
            '& > div': {
              opacity: 1,
              visibility: 'inherit'
            },
            '& > img': {
              opacity: 0.5,
              visibility: 'inherit'
            }
          }
        }}
      >
        {data.sale > 0 && (
          <Box
            className="on-sale"
            sx={{
              width: '60px',
              height: '60px',
              fontSize: '12px',
              background: 'pink',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              right: '-7px',
              top: '-7px',
              zIndex: 2,
              color: '#fff',
              textTransform: 'uppercase',
              textAlign: 'center'
            }}
          >
            On <br /> Sale
          </Box>
        )}

        <img src={data.images[0].url} alt="" />
        <Box
          sx={{
            position: 'absolute',
            textAlign: 'center',
            left: 0,
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            opacity: 0,
            visibility: 'hidden'
          }}
        >
          <DialogHome data={data} age={age}>
            hahaha
          </DialogHome>
        </Box>
      </Box>
      <Typography
        sx={{
          color: '#333',
          fontWeight: '700',
          margin: '7px 0',
          fontSize: '1.07143rem',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': 2,
          overflow: 'hidden'
        }}
      >
        {data.name}
      </Typography>
      <Typography
        sx={{
          fontWeight: '400',
          mb: 1,
          fontSize: '1rem'
        }}
      >
        {data.detail.filter((d) => d.size === age)[0]?.price} VNĐ
      </Typography>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        onChange={handleChange}
        fullWidth
        displayEmpty
      >
        <MenuItem value={''} disabled>
          Select Size
        </MenuItem>
        {data.detail.map((d, i) => (
          <MenuItem value={d.size} key={i}>
            {d.size} -{d.price} VNĐ
          </MenuItem>
        ))}
      </Select>
      <Box sx={{ textAlign: 'center' }}>
        <button className="submit">Chọn sản phẩm</button>
      </Box>
    </Box>
  );
}

export default ProductItem;
