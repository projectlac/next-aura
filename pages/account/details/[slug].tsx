import BaseLayout from '@/layouts/BaseLayout';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import React, { ReactElement } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img from '@/assets/images/454-HhXmb.webp';
import Image from 'next/image';
function DetailAccout() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 15 }}>
      <Box py={3}>
        <Slider {...settings}>
          <Box
            height={690}
            sx={{
              display: 'flex !important',
              alignItems: 'center'
            }}
          >
            <Box
              width={700}
              sx={{
                background: '#37336f61',
                margin: '0 auto',
                padding: '25px',
                borderRadius: '10px'
              }}
            >
              <Grid container columnSpacing={1.5} rowSpacing={2}>
                <Grid item md={4} xs={12}>
                  <Box
                    textAlign={'center'}
                    sx={{
                      color: '#fff'
                    }}
                  >
                    <Typography fontSize={25} fontWeight={'bold'}>
                      Cấp AR
                    </Typography>
                    <Typography fontSize={20} fontWeight={'bold'}>
                      23
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box
                    textAlign={'center'}
                    sx={{
                      color: '#fff'
                    }}
                  >
                    <Typography fontSize={25} fontWeight={'bold'}>
                      Server
                    </Typography>
                    <Typography fontSize={20} fontWeight={'bold'}>
                      Asia
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box
                    textAlign={'center'}
                    sx={{
                      color: '#fff'
                    }}
                  >
                    <Typography fontSize={25} fontWeight={'bold'}>
                      Tướng 5*
                    </Typography>
                    <Typography fontSize={20} fontWeight={'bold'}>
                      23
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={12} xs={12} textAlign="center">
                  <Typography fontSize={25} fontWeight={'bold'} color="#fff">
                    Tướng 5*
                  </Typography>
                  <Divider
                    sx={{ my: 1, background: 'rgb(255 255 255 / 89%)' }}
                  ></Divider>
                </Grid>

                <Grid item md={12} xs={12} textAlign="center" color="#fff">
                  <Typography fontSize={25} fontWeight={'bold'} color="#fff">
                    Giá: 1.000.000.000 VNĐ
                  </Typography>
                  <Divider
                    sx={{ my: 1, background: 'rgb(255 255 255 / 89%)' }}
                  ></Divider>
                </Grid>

                <Grid item md={12} xs={12} textAlign="center">
                  <Button variant="contained">Mua ngay</Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <div>
            <Image src={img} width={1352} height={690}></Image>
          </div>
        </Slider>
      </Box>
    </Container>
  );
}

export default DetailAccout;
DetailAccout.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
