import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  styled,
  TextField,
  Typography
} from '@mui/material';
import { ReactElement, useState } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';
import image from '@/assets/images/Genshin_Impact_cover.jpg';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;

    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  const [login, setLogin] = useState<boolean>(true);
  const route = useRouter();
  return (
    <OverviewWrapper>
      <Head>
        <title>Genshin Shop</title>
      </Head>

      <Container maxWidth="md" sx={{ mt: 15 }}>
        <Box py={3}>
          <Card>
            <Grid container sx={{ position: 'relative' }}>
              <Grid md={6} item>
                {!login && (
                  <Box p={10}>
                    <Typography
                      mb={2.7}
                      textAlign="center"
                      fontWeight="bold"
                      fontSize={19}
                      textTransform="uppercase"
                    >
                      Đăng ký ngay
                    </Typography>
                    <TextField
                      id="outlined-basic"
                      label="Tài khoản"
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      sx={{ mt: 2.48 }}
                      id="outlined-basic"
                      label="Mật khẩu"
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      sx={{ mt: 2.48 }}
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2.48 }}
                      onClick={() => {
                        setLogin(true);
                      }}
                    >
                      Đăng ký
                    </Button>
                  </Box>
                )}
              </Grid>
              <Grid md={6} item>
                {login && (
                  <Box p={10}>
                    <Typography
                      mb={3}
                      textAlign="center"
                      fontWeight="bold"
                      fontSize={19}
                      textTransform="uppercase"
                    >
                      Đăng nhập ngay
                    </Typography>
                    <TextField
                      id="outlined-basic"
                      label="Tài khoản"
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      sx={{ mt: 3 }}
                      id="outlined-basic"
                      label="Mật khẩu"
                      variant="outlined"
                      fullWidth
                    />

                    <Typography
                      textAlign={'right'}
                      sx={{ my: 1, cursor: 'pointer' }}
                    >
                      <Link href={'/forgot-password'}>Quên mật khẩu</Link>
                    </Typography>

                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => {
                        route.push('/dashboards');
                      }}
                    >
                      Đăng nhập
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      sx={{ mt: 1 }}
                      onClick={() => {
                        setLogin(false);
                      }}
                    >
                      Đăng ký
                    </Button>
                  </Box>
                )}
              </Grid>
              <Grid
                md={6}
                item
                className={`dinamic-login ${login ? '' : 'active-login'}`}
              >
                <Box
                  sx={{
                    background: `url(${image})`,
                    width: '100%',
                    height: '100%',
                    backgroundSize: 'cover'
                  }}
                ></Box>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
