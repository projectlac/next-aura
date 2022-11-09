import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import Selection from '@/components/Common/Form/Selection';
import TextField from '@/components/Common/Form/TextField';
import OgTag from '@/components/Common/OgTag';
import TableDeposit from '@/components/Table/TableDeposit';
import { useAuth } from '@/contexts/AuthGuard';
import { ProtectGuess } from '@/contexts/ProtectGuess';
import BaseLayout from '@/layouts/BaseLayout';
import { Button, Card, Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createDeposit, getDeposit } from 'api/apiDeposit/account';
import Head from 'next/head';
import * as React from 'react';
import * as yup from 'yup';

const validationSchema = yup.object({
  pack: yup.string().required('Trường này là bắt buộc'),
  uid: yup.string().required('Trường này là bắt buộc'),
  username: yup.string().required('Trường này là bắt buộc'),
  password: yup.string().required('Trường này là bắt buộc'),
  server: yup.string().required('Trường này là bắt buộc'),
  ingame: yup.string().required('Trường này là bắt buộc'),
  social: yup.string().required('Trường này là bắt buộc')
});
const initForm = {
  pack: '1',
  uid: '',
  username: '',
  password: '',
  server: 'Asia',
  ingame: '',
  social: '',
  note: ''
};

export default function VerticalTabs() {
  const { handleSetMessage, update, updateSuccess } = useAuth();
  const [history, setHistory] = React.useState([]);
  const [pending, setPending] = React.useState(false);
  const onSubmit = async (values, { resetForm }) => {
    const { pack, uid, username, password, server, ingame, social, note } =
      values;
    setPending(true);
    try {
      await createDeposit({
        pack: +pack,
        uuid: uid,
        username,
        password,
        server,
        name: ingame,
        phone: social,
        note
      }).then(() => {
        updateSuccess();
        handleSetMessage({
          type: 'success',
          message: 'Yêu cầu nạp thành công'
        });
        setPending(false);
        resetForm();
      });
    } catch (error) {
      handleSetMessage({ type: 'error', message: error.response.data.message });
      setPending(false);
    }
  };

  React.useEffect(() => {
    getDeposit().then((res) => {
      setHistory(res.data.data);
    });
  }, [update]);
  const formik = useCustomForm(validationSchema, initForm, onSubmit);

  // React.useEffect(()=>{

  // },[])
  return (
    <ProtectGuess>
      <Head>
        <title>Nạp đá sáng thế Genshin, pack Genshin </title>
        <OgTag title="Nạp đá sáng thế Genshin, pack Genshin" />
      </Head>
      <Container maxWidth="lg" sx={{ mt: 20, mb: 10 }}>
        <Card sx={{ p: 3 }}>
          <FormatForm formik={formik}>
            <Grid container columnSpacing={1.5} rowSpacing={2}>
              <Grid item md={6} xs={12}>
                <Box mt={1}>
                  <Typography
                    textTransform={'uppercase'}
                    fontWeight={'bold'}
                    fontSize={22}
                    textAlign={'center'}
                    sx={{
                      mb: 2
                    }}
                  >
                    Nạp Genshin Impact
                  </Typography>

                  <Grid container columnSpacing={1.5} rowSpacing={2}>
                    <Grid item xs={12}>
                      <Selection
                        formik={formik}
                        label="Gói nạp"
                        variant="outlined"
                        fullWidth
                        name="pack"
                        options={[
                          {
                            value: '1',
                            title:
                              '105,000 đ - Gói nạp không nguyệt chúc phúc x1'
                          },
                          {
                            value: '2',
                            title:
                              '209,000 đ - Gói nạp không nguyệt chúc phúc x2'
                          },
                          {
                            value: '3',
                            title:
                              '315,000 đ - Gói nạp không nguyệt chúc phúc x3'
                          },
                          {
                            value: '4',
                            title:
                              '316,000 đ - Goi nạp không nguyệt chúc phúc + Nhật kí'
                          },
                          {
                            value: '5',
                            title:
                              '525,000 đ - Gói nạp không nguyệt + Bài ca chân châu'
                          },
                          {
                            value: '6',
                            title: '210,000 đ - Gói nạp nhật ký hành trình'
                          },
                          {
                            value: '7',
                            title: '420,000 đ - Gói nạp bài ca chân châu'
                          },
                          {
                            value: '8',
                            title: '106,000 đ - Gói nạp 300 đá sáng thế'
                          },
                          {
                            value: '9',
                            title: '310,000 đ - Gói nạp 980 đá sáng thế'
                          },
                          {
                            value: '10',
                            title: '620,000 đ - Gói nạp 1980 đá sáng thế'
                          },
                          {
                            value: '11',
                            title: '1,000,000 đ - Gói nạp 3280 đá sáng thế'
                          },
                          {
                            value: '12',
                            title: '2,000,000 đ - Gói nạp 6480 đá sáng thế x1'
                          },
                          {
                            value: '13',
                            title: '4,000,000 đ - Gói nạp 6480 đá sáng thế x2'
                          },
                          {
                            value: '14',
                            title: '6,000,000 đ - Gói nạp 6480 đá sáng thế x3'
                          },
                          {
                            value: '15',
                            title: '8,000,000 đ - Gói nạp 6480 đá sáng thế x4'
                          },
                          {
                            value: '16',
                            title: '10,000,000 đ - Gói nạp 6480 đá sáng thế x5'
                          }
                        ]}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        formik={formik}
                        label="UID"
                        placeholder=""
                        variant="outlined"
                        fullWidth
                        name="uid"
                        type="text"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        formik={formik}
                        label="Tên tài khoản"
                        placeholder=""
                        variant="outlined"
                        fullWidth
                        name="username"
                        type="text"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        formik={formik}
                        label="Mật khẩu"
                        placeholder=""
                        variant="outlined"
                        fullWidth
                        name="password"
                        type="text"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Selection
                        formik={formik}
                        label="Server"
                        variant="outlined"
                        fullWidth
                        name="server"
                        options={[
                          { value: 'Asia', title: 'Asia' },
                          { value: 'America', title: 'America' },
                          { value: 'Europe', title: 'Europe' },
                          { value: 'TW-HK-MO', title: 'TW-HK-MO' }
                        ]}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        formik={formik}
                        label="Tên ingame"
                        placeholder=""
                        variant="outlined"
                        fullWidth
                        name="ingame"
                        type="text"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        formik={formik}
                        label="Thông tin liên hệ (FB hoặc Zalo)"
                        placeholder=""
                        variant="outlined"
                        fullWidth
                        name="social"
                        type="text"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        formik={formik}
                        label="Ghi chú"
                        placeholder=""
                        variant="outlined"
                        fullWidth
                        name="note"
                        type="text"
                      />
                    </Grid>
                    <Grid item xs={12} textAlign="center">
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={pending}
                      >
                        Yêu cầu nạp
                      </Button>
                      <p>
                        <b>
                          <span style={{ color: '#d33' }}>Lưu ý:</span> Shop sẽ
                          lấy mã nạp game trong khoản từ 20h-22h cùng ngày.
                        </b>
                      </p>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <Box mt={1}>
                  <Typography
                    textTransform={'uppercase'}
                    fontWeight={'bold'}
                    fontSize={22}
                    textAlign={'center'}
                    sx={{
                      mb: 2
                    }}
                  >
                    Lịch sử nạp
                  </Typography>
                  <Box>
                    <TableDeposit data={history} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </FormatForm>
        </Card>
      </Container>
    </ProtectGuess>
  );
}
VerticalTabs.getLayout = function getLayout(page: React.ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
