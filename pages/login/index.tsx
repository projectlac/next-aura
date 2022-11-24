import image from '@/assets/images/Genshin_Impact_cover.jpg';
import useCustomForm from '@/components/Common/Form/Form';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Hidden,
  styled,
  Typography
} from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { ReactElement, useState } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';
import * as yup from 'yup';

import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import { useAuth } from '@/contexts/AuthGuard';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;

    flex: 1;
    overflow-x: hidden;
`
);

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Email là bắt buộc')
    .matches(/^[a-zA-Z0-9\W|_]\S+$/g, 'Không được có khoảng trắng'),
  password: yup
    .string()
    .min(6, 'Password phải có ít nhất 6 ký tự')
    .required('Password là bắt buộc')
});
const validationSchemaRegis = yup.object({
  username: yup
    .string()
    .required('Username là bắt buộc')
    .matches(/^[a-zA-Z0-9\W|_]\S+$/g, 'Không được có khoảng trắng'),
  email: yup.string().email().required('Email là bắt buộc'),
  password: yup
    .string()
    .min(6, 'Password phải có ít nhất 6 ký tự')
    .required('Password là bắt buộc')
});
function Overview() {
  const [loginMode, setLoginMode] = useState<boolean>(true);
  const { login } = useAuth();
  const initForm = {
    username: '',
    password: ''
  };

  const onSubmit = (values) => {
    const { username, password } = values;
    login(username, password);
  };

  const formik = useCustomForm(validationSchema, initForm, onSubmit);

  return (
    <OverviewWrapper>
      <Head>
        <title>Genshin Shop</title>
      </Head>

      <Container maxWidth="md" sx={{ mt: 15 }}>
        <Box py={3}>
          <Card>
            <Grid container sx={{ position: 'relative' }}>
              <Grid md={12} item>
                {loginMode && (
                  <Box sx={{ p: { md: 10, xs: 2 } }}>
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
                          setLoginMode(false);
                        }}
                      >
                        Đăng ký
                      </Button>
                    </FormatForm>
                  </Box>
                )}
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
