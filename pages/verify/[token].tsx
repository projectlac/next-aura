import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  styled,
  Typography
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';
import * as yup from 'yup';

import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import { useAuth } from '@/contexts/AuthGuard';
import { changePassword } from 'api/auth';
import Cookies from 'js-cookie';
const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;

    flex: 1;
    overflow-x: hidden;
`
);

const validationSchema = yup.object({
  password: yup
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .required('Trường này là bắt buộc'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Mật khẩu không giống')
});

function Overview() {
  const router = useRouter();
  const { handleSetMessage } = useAuth();
  const { token } = router.query;

  const initForm = {
    passwordConfirmation: '',
    password: ''
  };

  const onSubmit = async (values) => {
    const { passwordConfirmation, password } = values;
    let tokenDefault = '';
    try {
      await changePassword({
        password,
        confirmPassword: passwordConfirmation,
        token: token as string
      }).then((res) => {
        tokenDefault = res.data;
        handleSetMessage({
          type: 'success',
          message: 'Đổi mật khẩu thành công'
        });
      });
    } catch (error) {
      handleSetMessage({ type: 'error', message: error.response.data.message });
    }
    if (tokenDefault) {
      Cookies.set('token', tokenDefault, { expires: 60 });
      router.push('/');
    }
    // login(username, password);
  };
  const formik = useCustomForm(validationSchema, initForm, onSubmit);
  return (
    <OverviewWrapper>
      <Head>
        <title>Genshin Shop</title>
      </Head>

      <Container maxWidth="md" sx={{ mt: 15 }}>
        <Box py={3}>
          <Grid container justifyContent="center">
            <Grid md={6} item>
              <Card>
                <FormatForm formik={formik}>
                  <Box p={10}>
                    <Typography
                      mb={3}
                      textAlign="center"
                      fontWeight="bold"
                      fontSize={19}
                      textTransform="uppercase"
                    >
                      Đổi mất khẩu
                    </Typography>

                    <TextField
                      id="outlined-basic"
                      label="Mật khẩu mới"
                      variant="outlined"
                      type="password"
                      formik={formik}
                      fullWidth
                      sx={{ mb: 3 }}
                      name="password"
                    />
                    <TextField
                      id="outlined-basic"
                      label="Nhập lại mật khẩu mới"
                      variant="outlined"
                      type="password"
                      formik={formik}
                      fullWidth
                      sx={{ mb: 3 }}
                      name="passwordConfirmation"
                    />
                    <Button variant="contained" fullWidth type="submit">
                      Đổi mật khẩu
                    </Button>
                  </Box>
                </FormatForm>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
