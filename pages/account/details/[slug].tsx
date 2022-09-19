import img from '@/assets/images/454-HhXmb.webp';
import DialogCommonWithoutIcon from '@/components/Common/DialogCommon/DialogCommonWithoutIcon';
import BaseLayout from '@/layouts/BaseLayout';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography
} from '@mui/material';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactElement, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

function DetailAccout() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const customeSlider = useRef<any>();
  const router = useRouter();
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const buyAccount = () => {
    router.push('/history');
    handleCloseDialog();
  };
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
        <Slider ref={customeSlider} {...settings}>
          <Box
            sx={{
              height: { md: 690, xs: '100%' },
              display: 'flex !important',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                width: { md: 700, xs: 'auto' },
                background: '#37336f61',
                margin: '0 auto',
                padding: '25px',
                borderRadius: '10px'
              }}
            >
              <Grid container columnSpacing={1.5} rowSpacing={2}>
                <Grid item md={4} xs={4}>
                  <Box
                    textAlign={'center'}
                    sx={{
                      color: '#fff'
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { md: 25, xs: 15 }
                      }}
                      fontWeight={'bold'}
                    >
                      Cấp AR
                    </Typography>
                    <Typography fontSize={20} fontWeight={'bold'}>
                      23
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={4} xs={4}>
                  <Box
                    textAlign={'center'}
                    sx={{
                      color: '#fff'
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { md: 25, xs: 15 }
                      }}
                      fontWeight={'bold'}
                    >
                      Server
                    </Typography>
                    <Typography fontSize={20} fontWeight={'bold'}>
                      Asia
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={4} xs={4}>
                  <Box
                    textAlign={'center'}
                    sx={{
                      color: '#fff'
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { md: 25, xs: 15 }
                      }}
                      fontWeight={'bold'}
                    >
                      Tướng 5*
                    </Typography>
                    <Typography fontSize={20} fontWeight={'bold'}>
                      23
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={12} xs={12} textAlign="center">
                  <Typography
                    sx={{
                      fontSize: { md: 25, xs: 15 }
                    }}
                    fontWeight={'bold'}
                    color="#fff"
                  >
                    Tướng 5*
                  </Typography>
                  <Divider
                    sx={{
                      my: 1,
                      background: 'rgb(255 255 255 / 89%)'
                    }}
                  ></Divider>
                </Grid>

                <Grid item md={12} xs={12} textAlign="center" color="#fff">
                  <Typography
                    sx={{
                      fontSize: { md: 25, xs: 15 }
                    }}
                    fontWeight={'bold'}
                    color="#fff"
                  >
                    Giá: 1.000.000.000 VNĐ
                  </Typography>
                  <Divider
                    sx={{ my: 1, background: 'rgb(255 255 255 / 89%)' }}
                  ></Divider>
                </Grid>

                <Grid item md={6} xs={12} textAlign="center">
                  <DialogCommonWithoutIcon
                    titleButton={'Mua ngay'}
                    title={'Xác nhận mua hàng'}
                    handleCloseDialog={handleCloseDialog}
                    handleOpenDialog={handleOpenDialog}
                    openDialog={openDialog}
                  >
                    <Typography fontSize={15}>
                      Bạn có chắc muốn mua tài khoản này không?
                      <br />
                      Sau khi mua, thông tin tài khoản sẽ được lưu vào lịch sử
                      mua hàng.
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Grid container>
                      <Grid item md={6} xs={12} textAlign="center">
                        <Button variant="contained" onClick={buyAccount}>
                          Xác nhận
                        </Button>
                      </Grid>
                      <Grid item md={6} xs={12} textAlign="center">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={handleCloseDialog}
                        >
                          Đóng
                        </Button>
                      </Grid>
                    </Grid>
                  </DialogCommonWithoutIcon>
                </Grid>
                <Grid item md={6} xs={12} textAlign="center">
                  <Button
                    variant="contained"
                    onClick={() => {
                      customeSlider &&
                        customeSlider.current &&
                        customeSlider?.current?.slickNext();
                    }}
                  >
                    Xem chi tiết
                  </Button>
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
