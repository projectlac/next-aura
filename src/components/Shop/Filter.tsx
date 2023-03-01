import { Box, Typography, useAutocomplete } from '@mui/material';
import Link from 'next/link';
import React, { useRef } from 'react';
// import { ICategoryData } from "~/models/category";
import { styled } from '@mui/material/styles';
import { getProduct } from 'api/product/productApi';
import { IProduct } from 'model/product';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
interface IProps {
  category: any;
}

const Input = styled('input')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
  color: theme.palette.mode === 'light' ? '#000' : '#fff',
  width: '100%',
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
      width: 'calc(100% - 75px)'
    }
  },
  '&::-webkit-scrollbar': {
    width: '10px'
  },
  '&::-webkit-scrollbar-track': {
    background: ' #f1f1f1'
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888'
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555'
  }
}));

function Filter({ category }: IProps) {
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
    <Box
      className="sticky-filter"
      // ref={ref}
      sx={{
        '&.sticky-filter': {
          position: 'sticky',
          top: '90px'
        }
      }}
    >
      <FormControl variant="standard">
        <div>
          <Box
            {...getRootProps()}
            sx={{
              position: 'relative'
            }}
          >
            <Input {...getInputProps()} placeholder="Tìm kiếm" />
            <SearchIcon
              sx={{
                position: 'absolute',
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
          </Box>
          {groupedOptions.length > 0 ? (
            <Listbox {...getListboxProps()}>
              {(groupedOptions as typeof product).map((option, index) => {
                return (
                  <li {...getOptionProps({ option, index })} key={index}>
                    <Box
                      sx={{
                        width: '75px',
                        height: '90px',
                        background: `url(${option.images[0].url})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                      }}
                    ></Box>
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
      <Typography
        sx={{
          fontSize: '15px',
          fontWeight: 'bold',
          marginBottom: '19px',
          textTransform: 'uppercase',
          marginTop: '25px'
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
                <Link href={`/shop/category/${d.slug}`}>
                  <a>
                    {d.name} ({d.total_product})
                  </a>
                </Link>
              </li>
            ))}
        </ul>
      </Box>
    </Box>
  );
}

export default Filter;
