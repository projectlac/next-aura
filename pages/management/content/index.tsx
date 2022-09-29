import TinyEditor from '@/components/Common/Editor/TinyEditor';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { useAuth } from '@/contexts/AuthGuard';
import SidebarLayout from '@/layouts/SidebarLayout';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Grid, Typography } from '@mui/material';

import { getWebInformation, updateWebInformation } from 'api/auth';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
const validationSchema = yup.object({
  youtube: yup.string().required('Trường này là bắt buộc')
});

function ContentManager() {
  const { handleSetMessage } = useAuth();
  const [data, setData] = useState({
    description: '',
    youtube: ''
  });
  const onSubmit = async (values) => {
    const { youtube, description } = values;
    try {
      updateWebInformation(youtube, description).then(() => {
        handleSetMessage({
          type: 'success',
          message: `Cập nhật thành công`
        });
      });
    } catch (error) {
      handleSetMessage({ type: 'error', message: error.response.data.message });
    }
  };
  const initForm = data;
  const formik = useCustomForm(validationSchema, initForm, onSubmit);
  const changeContent = (data: string) => {
    formik.handleChange({
      target: { name: 'description', value: data }
    });
  };

  useEffect(() => {
    getWebInformation().then((res) =>
      setData({
        youtube: res.data[0].youtube,
        description: res.data[0].description
      })
    );
  }, []);
  return (
    <>
      <Head>
        <title>Quản lý nội dung</title>
      </Head>
      <PageTitleWrapper>
        <FormatForm formik={formik}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h3" component="h3" gutterBottom>
                Quản lý nội dung hiển thị
              </Typography>
              <Typography variant="subtitle2">
                Thông báo và link youtube sẽ được đăng tại đây đây nhé!
              </Typography>
            </Grid>
            <Grid item>
              <Button
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="contained"
                startIcon={<SaveIcon fontSize="small" />}
                type="submit"
              >
                Lưu
              </Button>
            </Grid>
          </Grid>

          <TextField
            formik={formik}
            label="Link youtube"
            placeholder=""
            variant="outlined"
            fullWidth
            name="youtube"
            type="text"
            sx={{ my: 3, background: '#fff' }}
          />
          <TinyEditor changeBody={changeContent} defaultValue={''} />
        </FormatForm>
      </PageTitleWrapper>
    </>
  );
}

ContentManager.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default ContentManager;
