import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';

interface IProps {
  handleData: (
    currency: string,
    isTrueSet: boolean,
    ar: string,
    code: string
  ) => void;
}
function FilterRandom({ handleData }: IProps) {
  const [currency, setCurrency] = useState('');
  const [sort, setSort] = useState('false');
  const [ar, setAr] = useState('');
  const [code, setCode] = useState('');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'ar') {
      setAr(e.target.value);
    } else {
      setCode(e.target.value);
    }
  };
  const search = () => {
    var isTrueSet = sort === 'true';
    handleData(currency, isTrueSet, ar, code);
  };
  return (
    <Card
      sx={{
        background: '#fff',
        padding: '15px',
        borderRadius: '5px',
        transition: 'all 0.5s'
      }}
    >
      <Typography
        textAlign={'center'}
        fontWeight={'bold'}
        fontSize={18}
        textTransform="uppercase"
      >
        Tìm kiếm
      </Typography>
      <Divider sx={{ mt: 1, mb: 3 }}></Divider>

      <Grid container columnSpacing={1.3} rowSpacing={2.5}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="outlined-required"
            label="AR"
            name="ar"
            type={'number'}
            placeholder="Nhập AR thấp nhất"
            onChange={handleChangeInput}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-select-currency"
            select
            label="Tìm theo giá"
            fullWidth
            value={currency}
            onChange={handleChange}
          >
            <MenuItem value="" disabled>
              Chọn giá
            </MenuItem>
            <MenuItem value="1-10000">10k trở xuống</MenuItem>
            <MenuItem value="10000-50000">10K - 50K</MenuItem>
            <MenuItem value="50000-100000">50K - 100K</MenuItem>
            <MenuItem value="100000-200000">100K - 200K</MenuItem>
            <MenuItem value="200000-300000">200K - 300K</MenuItem>
            <MenuItem value="300000-400000">300K - 400K</MenuItem>
            <MenuItem value="400000-500000">400K - 500K</MenuItem>
            <MenuItem value="500000-800000">500K - 800K</MenuItem>
            <MenuItem value="800000-1000000">800K - 1tr</MenuItem>
            <MenuItem value="1000000-5000000">1tr - 5tr</MenuItem>
            <MenuItem value="5000000-999999999">Trên 5tr</MenuItem>
          </TextField>
        </Grid>

        <Grid item md={12} xs={12}>
          <TextField
            id="outlined-select-currency"
            select
            label="Sắp xếp giá"
            fullWidth
            value={sort}
            onChange={handleChangeSort}
          >
            <MenuItem value={'true'}>Tăng dần</MenuItem>
            <MenuItem value={'false'}>Giảm dần</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Mã số"
            name="code"
            type={'number'}
            onChange={handleChangeInput}
          />
        </Grid>
      </Grid>
      <Divider sx={{ mt: 1, mb: 1 }}></Divider>
      <Box textAlign={'center'}>
        <Button variant="contained" onClick={search}>
          Tìm kiếm
        </Button>
      </Box>
    </Card>
  );
}

export default FilterRandom;
