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
import { ReactElement, useState } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';
import * as yup from 'yup';

import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import { useAuth } from '@/contexts/AuthGuard';
import { forgotPassword } from 'api/auth';
const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    min-height: calc(100vh - 370px);
    flex: 1;
    overflow-x: hidden;
`
);
const validationSchema = yup.object({
  email: yup.string().email('Sai định dạng').required('Trường này là bắt buộc')
});
const initForm = {
  email: ''
};
function Overview() {
  const { handleSetMessage } = useAuth();
  const [success, setSuccess] = useState(false);
  const onSubmit = async (values) => {
    const { email } = values;
    try {
      await forgotPassword(email).then(() => {
        setSuccess(true);
      });
    } catch (error) {
      handleSetMessage({ type: 'error', message: error.response.data.message });
    }
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
                {success ? (
                  <Box padding={3} textAlign={'center'}>
                    Một mail đã gửi tới email của bạn, vui lòng kiểm tra và làm
                    theo hướng dẫn.
                  </Box>
                ) : (
                  <FormatForm formik={formik}>
                    <Box p={10}>
                      <Typography
                        mb={3}
                        textAlign="center"
                        fontWeight="bold"
                        fontSize={19}
                        textTransform="uppercase"
                      >
                        Quên mật khẩu
                      </Typography>
                      <TextField
                        id="outlined-basic"
                        label="Nhập email đăng ký"
                        variant="outlined"
                        type="text"
                        formik={formik}
                        fullWidth
                        sx={{ mb: 3 }}
                        name="email"
                      />

                      <Button variant="contained" fullWidth type="submit">
                        {formik.isSubmitting ? 'Loading...' : 'Quên mật khẩu'}
                      </Button>
                    </Box>
                  </FormatForm>
                )}
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
