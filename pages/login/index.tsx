import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  styled,
  Typography
} from '@mui/material';
import { ReactElement, useState } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';
import image from '@/assets/images/Genshin_Impact_cover.jpg';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useCustomForm from '@/components/Common/Form/Form';
import * as yup from 'yup';

import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;

    flex: 1;
    overflow-x: hidden;
`
);

const validationSchema = yup.object({
  username: yup.string().required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
});
const validationSchemaRegis = yup.object({
  username: yup.string().required('Username is required'),
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
});
function Overview() {
  const [login, setLogin] = useState<boolean>(true);
  const initForm = {
    username: '',
    password: ''
  };
  const initFormRegis = {
    username: '',
    password: '',
    email: ''
  };
  const onSubmit = () => {
    console.log('submit');
  };
  const formik = useCustomForm(validationSchema, initForm, onSubmit);
  const formikRegis = useCustomForm(
    validationSchemaRegis,
    initFormRegis,
    onSubmit
  );

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
                    <FormatForm formik={formikRegis}>
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
                        type="text"
                        label="Tài khoản"
                        variant="outlined"
                        name="username"
                        formik={formikRegis}
                        fullWidth
                      />
                      <TextField
                        sx={{ mt: 2.48 }}
                        name="password"
                        type="text"
                        formik={formikRegis}
                        label="Mật khẩu"
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        sx={{ mt: 2.48 }}
                        name="email"
                        type="email"
                        formik={formikRegis}
                        label="Email"
                        variant="outlined"
                        fullWidth
                      />
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2.48 }}
                        type="submit"
                      >
                        Đăng ký
                      </Button>
                    </FormatForm>
                  </Box>
                )}
              </Grid>
              <Grid md={6} item>
                {login && (
                  <Box p={10}>
                    <FormatForm formik={formik}>
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
                        formik={formik}
                        label="Tài khoản"
                        variant="outlined"
                        fullWidth
                        name="username"
                        type="text"
                      />
                      <TextField
                        formik={formik}
                        sx={{ mt: 3 }}
                        id="outlined-basic"
                        label="Mật khẩu"
                        variant="outlined"
                        fullWidth
                        name="password"
                        type="password"
                      />

                      <Typography
                        textAlign={'right'}
                        sx={{ my: 1, cursor: 'pointer' }}
                      >
                        <Link href={'/forgot-password'}>Quên mật khẩu</Link>
                      </Typography>

                      <Button variant="contained" fullWidth type="submit">
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
                    </FormatForm>
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
