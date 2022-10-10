import {
  Box,
  Card,
  Container,
  Dialog,
  Divider,
  Grid,
  Hidden,
  styled,
  Typography
} from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import Head from 'next/head';

import OgTag from '@/components/Common/OgTag';
import TitleWeb from '@/components/Common/TitleWeb';
import ProductCollection from '@/components/ProductCollection/ProductCollection';
import formatMoney from '@/utility/formatMoney';
import { getTop10 } from 'api/apiDeposit/account';
import { getWebInformation } from 'api/auth';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;

    flex: 1;
    overflow-x: hidden;
`
);
interface ITopUp {
  username: string;
  sum: string;
}
function Overview() {
  const [data, setData] = useState({
    description: '',
    youtube: ''
  });
  const [top10, setTop10] = useState<ITopUp[]>([]);
  const [open, setOpen] = useState(true);
  const handleCloseDialog = () => {
    setOpen(false);
  };
  useEffect(() => {
    getWebInformation().then((res) =>
      setData({
        youtube: res.data[0].youtube,
        description: res.data[0].description
      })
    );
    getTop10().then((res) => {
      const sort = res.data.sort((a, b) => b.sum - a.sum);

      setTop10(sort);
    });
  }, []);
  return (
    <OverviewWrapper>
      <Head>
        <title>
          GenshinViet.com - Website bán acc Genshin uy tín, hàng đầu Việt Nam
        </title>
        <OgTag title="GenshinViet.com - Website bán acc Genshin uy tín, hàng đầu Việt Nam" />
      </Head>

      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <Box
          pt={3}
          pb={2}
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          textAlign={{ xs: 'center', md: 'left' }}
          justifyContent="center"
        >
          <TitleWeb mt={2}> Shop Acc Việt Nam Giá Rẻ</TitleWeb>
        </Box>
        <Grid container columnSpacing={2} rowSpacing={2}>
          <Hidden mdDown>
            <Grid item md={4} xs={12}>
              <Card
                sx={{
                  background:
                    'linear-gradient(90deg, rgba(228,214,200,1) 0%, rgba(239,231,225,1) 50%, rgba(228,214,200,1) 100%)'
                }}
              >
                <Typography
                  textAlign="center"
                  sx={{
                    padding: '15px',
                    fontSize: { md: '24px', xs: '15px' },
                    fontWeight: 'bold',
                    color: '#856f56',
                    textTransform: 'uppercase'
                  }}
                >
                  Top Nạp
                </Typography>
                <Divider />
                <Box
                  sx={{
                    padding: '0 15px '
                  }}
                >
                  <ul style={{ padding: 0, listStyle: 'none' }}>
                    {top10.map((d: ITopUp, i) => (
                      <li
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '7px 0',
                          alignItems: 'center'
                        }}
                        key={i}
                      >
                        <Typography
                          sx={{
                            fontSize: { md: '17px', xs: '15px' },

                            fontWeight: '600',
                            display: 'flex',
                            color: '#a7947f',
                            fontStyle: 'italic',
                            '& span': {
                              width: '26px',
                              height: '26px',
                              display: 'flex',
                              background: '#e5d7ca',
                              borderRadius: '50%',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              marginRight: '15px',
                              border: '2px solid #c7ae92',
                              color: '#917c65'
                            }
                          }}
                        >
                          <span>{i + 1} </span> ***{d.username}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '13px',
                            fontWeight: '600',
                            display: 'flex',
                            color: '#a7947f',
                            background: '#ffffff59',
                            padding: '5px 10px',
                            borderRadius: '15px',
                            border: '2px solid #c7ae92'
                          }}
                        >
                          {formatMoney(d.sum)} VNĐ
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              </Card>
            </Grid>
          </Hidden>
          <Grid item md={8} xs={12}>
            <Box
              sx={{
                position: 'relative',
                paddingBottom: { md: '70.3%', xs: '56.25%' },
                height: '0%',
                borderRadius: '15px',
                overflow: 'hidden',

                '& iframe': {
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%'
                }
              }}
            >
              <iframe
                width="1500"
                height="900"
                src={`https://www.youtube.com/embed/${data.youtube}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Box>
          </Grid>
          <Hidden mdUp>
            <Grid item md={4} xs={12}>
              <Card
                sx={{
                  background:
                    'linear-gradient(90deg, rgba(228,214,200,1) 0%, rgba(239,231,225,1) 50%, rgba(228,214,200,1) 100%)'
                }}
              >
                <Typography
                  textAlign="center"
                  sx={{
                    padding: '15px',
                    fontSize: { md: '24px', xs: '15px' },
                    fontWeight: 'bold',
                    color: '#856f56',
                    textTransform: 'uppercase'
                  }}
                >
                  Top Nạp
                </Typography>
                <Divider />
                <Box
                  sx={{
                    padding: '0 15px '
                  }}
                >
                  <ul style={{ padding: 0, listStyle: 'none' }}>
                    {top10.map((d: ITopUp, i) => (
                      <li
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '7px 0',
                          alignItems: 'center'
                        }}
                        key={i}
                      >
                        <Typography
                          sx={{
                            fontSize: { md: '17px', xs: '15px' },

                            fontWeight: '600',
                            display: 'flex',
                            color: '#a7947f',
                            fontStyle: 'italic',
                            '& span': {
                              width: '26px',
                              height: '26px',
                              display: 'flex',
                              background: '#e5d7ca',
                              borderRadius: '50%',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              marginRight: '15px',
                              border: '2px solid #c7ae92',
                              color: '#917c65'
                            }
                          }}
                        >
                          <span>{i + 1} </span> ***{d.username}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '13px',
                            fontWeight: '600',
                            display: 'flex',
                            color: '#a7947f',
                            background: '#ffffff59',
                            padding: '5px 10px',
                            borderRadius: '15px',
                            border: '2px solid #c7ae92'
                          }}
                        >
                          {formatMoney(d.sum)} VNĐ
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              </Card>
            </Grid>
          </Hidden>
        </Grid>

        <Box py={3} mt={5}>
          <ProductCollection></ProductCollection>
        </Box>
      </Container>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box
          sx={{
            pa: 3,
            textAlign: 'center'
          }}
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></Box>
      </Dialog>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
