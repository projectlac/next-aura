import { Box, Typography, useAutocomplete } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import { getProduct } from 'api/product/productApi';
import { IProduct } from 'model/product';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.png';
import SearchIcon from '@mui/icons-material/Search';
const Header = styled(Box)({
  borderBottom: '1px solid #333',
  textAlign: 'center',
  background: '#fff',
  '& img': {
    margin: '0 auto',
    width: '186px',
    height: '91px'
  }
});

const Input = styled('input')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
  color: theme.palette.mode === 'light' ? '#000' : '#fff',
  width: '370px',
  height: '52px',
  background: '#F2F2F2',
  border: 'none',
  '& .MuiInputBase-root': {
    height: '52px'
  },
  '& fieldset': {
    border: 'none'
  },
  outline: 'none',
  padding: ' 7px 15px 7px 45px'
}));

const Listbox = styled('ul')(({ theme }) => ({
  width: '100%',
  margin: 0,
  padding: 0,
  zIndex: 9899,
  position: 'absolute',
  listStyle: 'none',
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
  overflow: 'auto',
  maxHeight: 350,
  border: '1px solid rgba(0,0,0,.25)',

  '& li.Mui-focused': {
    backgroundColor: '#4a8df6',
    color: 'white',
    cursor: 'pointer'
  },
  '& li:active': {
    backgroundColor: '#2977f5',
    color: 'white'
  },
  '& li': {
    display: 'flex',
    marginBottom: '7px',
    '& div': {
      height: '90px',
      width: '120px',
      '& img': {
        objectFit: 'cover',
        width: '100%'
      }
    },
    '& .MuiTypography-root': {
      width: 'calc(100% - 120px)'
    }
  }
}));
function HeaderWrapper() {
  const [product, setProduct] = useState<IProduct[]>([]);
  useEffect(() => {
    getProduct(999, 0).then((res) => {
      setProduct(res.data.data);
    });
  }, []);
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: product,
    getOptionLabel: (option: any) => option.name as string
  });

  return (
    <Header>
      <Box sx={{ mb: '31px', pt: '60px' }}>
        <Link href={'/'}>
          <img src={logo} alt="" />
        </Link>
      </Box>
      <FormControl variant="standard">
        <div>
          <Box
            {...getRootProps()}
            sx={{
              position: 'relative'
            }}
          >
            <Input
              {...getInputProps()}
              placeholder="Bạn đang tìm kiếm sản phẩm nào?"
            />
            <SearchIcon
              sx={{
                position: 'absolute',
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
            {/* <Input
              id="input-with-icon-textfield"
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <SearchIcon />
              //     </InputAdornment>
              //   )
              // }}
              placeholder="Bạn đang tìm kiếm sản phẩm nào?"
              // variant="outlined"
              sx={{
                width: '370px',
                height: '52px',
                background: '#F2F2F2',

                '& .MuiInputBase-root': {
                  height: '52px'
                },
                '& fieldset': {
                  border: 'none'
                }
              }}
              {...getInputProps()}
            /> */}
          </Box>
          {groupedOptions.length > 0 ? (
            <Listbox {...getListboxProps()}>
              {(groupedOptions as typeof product).map((option, index) => {
                return (
                  <li {...getOptionProps({ option, index })} key={index}>
                    <Box>
                      <img src={option.images[0].url} alt="" />
                    </Box>
                    <Typography
                      sx={{
                        padding: '15px',
                        textAlign: 'left'
                      }}
                    >
                      {option.name} <br />
                      <i>
                        <sup>Giá: {option.detail[0].price} VNĐ</sup>
                      </i>
                    </Typography>
                  </li>
                );
              })}
            </Listbox>
          ) : null}
        </div>
      </FormControl>
      <Box
        sx={{
          '& ul': {
            display: 'flex',
            justifyContent: 'center',
            listStyle: 'none',
            marginTop: '32px',
            '& li': {
              margin: '0 40px',
              textTransform: 'uppercase',
              '& a': {
                color: '#333',
                textDecoration: 'none',
                '&:hover': {
                  color: '#d33'
                }
              }
            }
          }
        }}
      >
        <ul>
          <li>
            <Link href={'/shop/new'}>Sản phẩm mới</Link>
          </li>
          <li>
            <Link href={'/shop/all'}>TỔNG HỢP SẢN PHẨM</Link>
          </li>
          <li>
            <Link href={'/shop/sale'}>SẢN PHẨM GIẢM GIÁ</Link>
          </li>
          <li>
            <Link href={'/shop/hot'}>BÁN CHẠY NHẤT</Link>
          </li>
          <li>LIÊN HỆ CHÚNG TÔI</li>
        </ul>
      </Box>
    </Header>
  );
}

export default HeaderWrapper;
