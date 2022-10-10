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
import { useState } from 'react';

function FilterReroll() {
  const [currency, setCurrency] = useState('EUR');
  const [sort, setSort] = useState('UP');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  return (
    <Card
      sx={{
        background:
          'linear-gradient(90deg, rgba(228,214,200,1) 0%, rgba(239,231,225,1) 50%, rgba(228,214,200,1) 100%)',
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
            type={'number'}
            placeholder="Nhập AR thấp nhất"
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
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="1">Dưới 500k</MenuItem>
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
            <MenuItem value="UP">Tăng dần</MenuItem>
            <MenuItem value="Down">Giảm dần</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Mã số"
            type={'number'}
          />
        </Grid>
      </Grid>
      <Divider sx={{ mt: 1, mb: 1 }}></Divider>
      <Box textAlign={'center'}>
        <Button variant="contained">Tìm kiếm</Button>
      </Box>
    </Card>
  );
}

export default FilterReroll;
