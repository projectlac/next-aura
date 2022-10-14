import DialogCommonWithoutIcon from '@/components/Common/DialogCommon/DialogCommonWithoutIcon';
import { useAuth } from '@/contexts/AuthGuard';
import BaseLayout from '@/layouts/BaseLayout';
import formatMoney from '@/utility/formatMoney';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import { buyAccount, getAccountBySlug } from 'api/apiAccount/account';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface IDetail {
  ar_level: string;
  server: string;
  hero: any;
  price: string;
  images: string;
  desc: string;
}
function DetailAccout() {
  const { handleSetMessage } = useAuth();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const customeSlider = useRef<any>();
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState<IDetail>();
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const buyAccountSubmit = async () => {
    try {
      await buyAccount(slug as string).then(() => {
        handleSetMessage({
          type: 'success',
          message: 'Bạn đã mua tài khoản thành công'
        });
        router.push('/history');
        handleCloseDialog();
      });
    } catch (error) {
      handleSetMessage({
        type: 'error',
        message:
          'Có lỗi xảy ra, nếu mất tiền, vui lòng liên hệ với Admin để kiểm tra lại'
      });
    }
  };

  useEffect(() => {
    if (slug) {
      getAccountBySlug(slug as string).then((res) => {
        let temp: IDetail = {
          ar_level: res.data.ar_level,
          server: res.data.server.desc,
          hero: res.data.heroes,
          price: res.data.price,
          images: res.data.avatar,
          desc: res.data.description
        };

        setData(temp);
        setLoading(false);
      });
    }
  }, [slug]);
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
                background: 'rgb(16 9 9 / 59%)',
                margin: '0 auto',
                padding: '25px',
                borderRadius: '10px'
              }}
            >
              {loading ? (
                <Box
                  display={'flex'}
                  alignItems="center"
                  justifyContent={'center'}
                >
                  <CircularProgress color="info" />
                </Box>
              ) : (
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
                        {data?.ar_level}
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
                        {data?.server}
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
                        Số lượng tướng
                      </Typography>
                      <Typography fontSize={20} fontWeight={'bold'}>
                        {data?.hero && data.hero.length}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item md={12} xs={12} textAlign="center" color="#fff">
                    <Typography
                      sx={{
                        fontSize: { md: 25, xs: 15 }
                      }}
                      fontWeight={'bold'}
                      color="#fff"
                    >
                      Giá: {formatMoney(data?.price)} VNĐ
                    </Typography>
                    <Divider
                      sx={{ mt: 1, background: 'rgb(255 255 255 / 89%)' }}
                    ></Divider>
                  </Grid>
                  <Grid item md={12} xs={12} textAlign="center">
                    <Typography
                      sx={{
                        fontSize: { md: 20, xs: 15 }
                      }}
                      fontWeight={'bold'}
                      color="#fff"
                    >
                      {data?.desc}
                    </Typography>
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
                          <Button
                            variant="contained"
                            onClick={buyAccountSubmit}
                          >
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
              )}
            </Box>
          </Box>

          <div>
            <Box
              style={{
                background: `url(${data?.images})`,
                width: 1352,
                height: 720,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            ></Box>
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
