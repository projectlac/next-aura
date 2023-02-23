import CloseIcon from '@mui/icons-material/Close';
import { Box, Divider, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { IProduct } from 'model/product';
import * as React from 'react';
import Slider from 'react-slick';
const emails = ['username@gmail.com', 'user02@gmail.com'];
import 'slick-carousel/slick/slick.css';
import * as _ from 'lodash';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState, useRef } from 'react';
export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  children: any;
  data: IProduct;
  age: string;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, data, age } = props;
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dot: true,
    arrows: false
  };
  const beautiSlider = () => {
    if (data.images.length > 4) return data.images;
    else {
      let a = [];
      while (true) {
        if (a.length < 4) {
          a.push(data.images);
        } else {
          break;
        }
      }
      return _.flatten(a);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={'md'}>
      <Box
        sx={{
          padding: '25px'
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <CloseIcon onClick={handleClose} />
        </Box>
        <Grid container>
          <Grid item md={7}>
            <Slider
              // {...settings}
              asNavFor={nav2}
              ref={(slider1) => setNav1(slider1)}
              dot={false}
              className="navSlider1"
            >
              {data.images &&
                data.images.length > 0 &&
                beautiSlider().map((d, i) => (
                  <div key={i}>
                    <img src={d.url} alt="" />
                  </div>
                ))}
            </Slider>
            <Slider
              asNavFor={nav1}
              className="navSlider2"
              ref={(slider2) => setNav2(slider2)}
              {...settings}
            >
              {data.images &&
                data.images.length > 0 &&
                beautiSlider().map((d, i) => (
                  <div key={i}>
                    <img src={d.url} alt="" />
                  </div>
                ))}
            </Slider>
          </Grid>
          <Grid item md={5}>
            <Box
              sx={{
                padding: '0 15px'
              }}
            >
              <Typography
                sx={{
                  paddingTop: '15px',
                  fontSize: '1.75rem',
                  lineHeight: '1.25'
                }}
              >
                {data.name}
              </Typography>
              <Typography sx={{ fontSize: '1.25rem' }}>
                Giá: {data.detail.filter((d) => d.size === age)[0]?.price} VNĐ
              </Typography>
              <Divider sx={{ my: 1 }}></Divider>

              <Typography sx={{ fontSize: '1rem', fontStyle: 'italic' }}>
                Mô tả:
              </Typography>
              <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

export default function DialogHome({ children, data, age }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button
        variant="outlined"
        sx={{
          background: '#fff',
          borderRadius: 0,
          color: '#333',
          borderColor: '#333',
          '&:hover': {
            background: '#fff',
            borderRadius: 0,
            color: '#333',
            borderColor: '#333'
          }
        }}
        onClick={handleClickOpen}
      >
        Thông tin
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        data={data}
        age={age}
      >
        {{ children }}
      </SimpleDialog>
    </div>
  );
}
