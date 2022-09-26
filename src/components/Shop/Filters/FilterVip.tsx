import {
  Autocomplete,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import { getHero, getWeapon } from 'api/apiTag/tagApi';
import React, { useEffect, useState } from 'react';
interface IFilm {
  desc: string;
}
interface IProps {
  handleFilter: (data: any) => void;
}
function FilterVip({ handleFilter }: IProps) {
  const [sort, setSort] = useState('true');
  const [ar, setAr] = useState('');
  const [code, setCode] = useState('');
  const [server, setServer] = useState('ASIA');
  const [rangeMoney, setRangeMoney] = useState('');
  const [inputValueHero, setInputValueHero] = useState<IFilm[]>([]);
  const [inputValueWeapon, setInputValueWeapon] = useState<IFilm[]>([]);
  const [optionHero, setOptionHero] = useState([]);
  const [optionWeapon, setOptionWeapon] = useState([]);

  useEffect(() => {
    getWeapon(999).then((res) => setOptionWeapon(res.data.data));
    getHero(999).then((res) => setOptionHero(res.data.data));
  }, [inputValueHero]);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'ar') {
      setAr(e.target.value);
    } else {
      setCode(e.target.value);
    }
  };
  const handleChange = (event) => {
    setRangeMoney(event.target.value);
  };
  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };
  const handleChangeServer = (event) => {
    setServer(event.target.value);
  };

  const submit = () => {
    var isTrueSet = sort === 'true';

    let data = {
      ar: ar,
      server: server,
      rangeMoney: rangeMoney,
      hero: inputValueHero && inputValueHero.map((d) => d.desc).toString(),
      weapon:
        inputValueWeapon && inputValueWeapon.map((d) => d.desc).toString(),
      priceSort: isTrueSet,
      keyword: code
    };
    handleFilter(data);
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
          <Autocomplete
            multiple
            id="tags-standard"
            options={optionHero}
            value={inputValueHero}
            onChange={(event: any, newValue: any) => {
              console.log(event.type);
              setInputValueHero(newValue);
            }}
            getOptionLabel={(option: IFilm) => option.desc}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Tìm theo nhân vật"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            id="tags-standard"
            options={optionWeapon}
            getOptionLabel={(option: IFilm) => option.desc}
            value={inputValueWeapon}
            onChange={(event: any, newValue: any) => {
              console.log(event.type);
              setInputValueWeapon(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Tìm theo vũ khí"
              />
            )}
          />
        </Grid>
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
            value={rangeMoney}
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

        <Grid item md={6} xs={12}>
          <TextField
            id="outlined-select-currency"
            select
            label="Sắp xếp giá"
            fullWidth
            value={sort}
            onChange={handleChangeSort}
          >
            <MenuItem value="true"> Giảm dần</MenuItem>
            <MenuItem value="false">Tăng dần</MenuItem>
          </TextField>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            id="outlined-select-currency"
            select
            label="Server"
            fullWidth
            value={server}
            onChange={handleChangeServer}
          >
            <MenuItem value="ASIA">Asia</MenuItem>
            <MenuItem value="AMERICA">America</MenuItem>
            <MenuItem value="EUROPE">Europe</MenuItem>
            <MenuItem value="TW-HK-MO">TW-HK-MO</MenuItem>
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
        <Button variant="contained" onClick={submit}>
          Tìm kiếm
        </Button>
      </Box>
    </Card>
  );
}

export default FilterVip;
