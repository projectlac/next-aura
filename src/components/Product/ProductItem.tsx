import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import React from 'react';
import image from '@/assets/images/ChaiAppleCupcake_1024x1024.webp';
import DialogHome from '../Dialog/DialogHome';
function ProductItem() {
  const [age, setAge] = React.useState('');
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
        <img src={image} alt="" />
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
          <DialogHome>hahaha</DialogHome>
        </Box>
      </Box>
      <Typography
        sx={{
          color: '#333',
          fontWeight: '700',
          margin: '7px 0',
          fontSize: '1.07143rem'
        }}
      >
        Pumpkin Chai Latte
      </Typography>
      <Typography
        sx={{
          fontWeight: '400',
          mb: 1,
          fontSize: '1rem'
        }}
      >
        $24.00
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
        <MenuItem value={'20'}>Twenty</MenuItem>
        <MenuItem value={'30'}>Thirty</MenuItem>
      </Select>
      <Box sx={{ textAlign: 'center' }}>
        <button className="submit">Select Size</button>
      </Box>
    </Box>
  );
}

export default ProductItem;
