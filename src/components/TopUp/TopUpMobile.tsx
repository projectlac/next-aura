import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as yup from 'yup';
import useCustomForm from '../Common/Form/Form';
import {
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Tooltip
} from '@mui/material';
import Selection from '../Common/Form/Selection';
import FormatForm from '../Common/Form/FormatForm';
import TextField from '../Common/Form/TextField';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const onSubmit = (values) => {
  console.log(values);
  console.log('submit?');
};

const validationSchema = yup.object({
  homeNetwork: yup.string().required('Trường này là bắt buộc'),
  cost: yup.string().required('Trường này là bắt buộc'),
  seri: yup.string().required('Trường này là bắt buộc'),
  code: yup.string().required('Trường này là bắt buộc')
});
const initForm = {
  homeNetwork: 'Viettel',
  cost: '',
  seri: '',
  code: ''
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { md: 3, xs: 0 } }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
enum CopyTextDefaut {
  COPY = 'Copy',
  COPIED = 'Compied!'
}
export default function TopUpMobile() {
  const [value, setValue] = React.useState(0);
  const formik = useCustomForm(validationSchema, initForm, onSubmit);

  const [copyText, setCopyTexy] = React.useState(CopyTextDefaut.COPY);

  const copySomething = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopyTexy(CopyTextDefaut.COPIED);
    setTimeout(() => {
      setCopyTexy(CopyTextDefaut.COPY);
    }, 500);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(event.type);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            '& .MuiTab-root': {
              color: '#fff'
            }
          }}
        >
          <Tab label="Nạp thẻ cào tự động" {...a11yProps(0)} />
          <Tab label="Nạp thẻ qua ATM/MOMO" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            color: '#fff',
            fontSize: '20px',
            textTransform: 'uppercase',
            textAlign: 'center',
            mt: 2
          }}
        >
          Nạp thẻ cào tự động
        </Typography>
        <Box
          mt={2}
          sx={{
            border: '1px solid #fff',
            padding: '15px',
            width: '100%',
            minHeight: '350px',
            background: '#fff'
          }}
        >
          <Grid container columnSpacing={1.5} rowSpacing={2}>
            <Grid item md={6} xs={12}>
              <Card sx={{ p: { md: 3, xs: 1 } }}>
                <FormatForm formik={formik}>
                  <Grid container columnSpacing={1.5} rowSpacing={2}>
                    <Grid item md={6} xs={12}>
                      <Selection
                        formik={formik}
                        label="Nhà mạng"
                        variant="outlined"
                        fullWidth
                        name="homeNetwork"
                        options={[
                          { value: 'Viettel', title: 'Viettel' },
                          { value: 'MobiPhone', title: 'MobiPhone' },
                          { value: 'VinaPhone', title: 'VinaPhone' },
                          { value: 'VietnamMobile', title: 'VietnamMobile' }
                        ]}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Selection
                        formik={formik}
                        label="Mệnh giá"
                        variant="outlined"
                        fullWidth
                        name="cost"
                        options={[
                          { value: '10000', title: '10.000 VND' },
                          { value: '20000', title: '20.000 VND' },
                          { value: '50000', title: '50.000 VND' },
                          { value: '100000', title: '100.000 VND' },
                          { value: '200000', title: '200.000 VND' },
                          { value: '500000', title: '500.000 VND' }
                        ]}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        formik={formik}
                        label="Seri thẻ"
                        placeholder=""
                        variant="outlined"
                        fullWidth
                        name="seri"
                        type="text"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        formik={formik}
                        label="Mã thẻ"
                        placeholder=""
                        variant="outlined"
                        fullWidth
                        name="code"
                        type="text"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button fullWidth variant="contained">
                        Nạp
                      </Button>
                    </Grid>
                  </Grid>
                </FormatForm>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography
                fontSize={'17px'}
                fontWeight={'bold'}
                textTransform="uppercase"
                textAlign={'center'}
              >
                Hướng dẫn nạp
              </Typography>
              <Divider sx={{ my: 1 }}></Divider>
              <Typography fontSize={'15px'} fontWeight={500}>
                Nạp thẻ chỉ nhật được{' '}
                <span style={{ background: 'red' }}>77% giá trị thẻ cào</span>{' '}
                do triết khấu
              </Typography>
              <Typography fontSize={'15px'} fontWeight={500}>
                <span style={{ color: 'red', background: 'white' }}>
                  <b>Ví dụ:</b>
                </span>{' '}
                <span style={{ background: 'red' }}>
                  Nạp 100k sẽ nhận lại 77k tiền shop
                </span>
              </Typography>
              <Divider sx={{ my: 1 }}></Divider>
              <Typography fontSize={'15px'} fontWeight={500}>
                Nếu nạp thẻ bị lỗi sau 2 phút{' '}
                <span style={{ background: 'red' }}> không nhận được tiền</span>{' '}
                hãy IB cho Shop để được xử lý
              </Typography>
              <Typography fontSize={'15px'} fontWeight={500}>
                <span style={{ color: 'red', background: 'white' }}>
                  <b>Lưu ý:</b> Vui lòng chọn đúng mệnh giá, sai mệnh giá đồng
                  nghĩa với mất thẻ
                </span>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            color: '#fff',
            fontSize: '20px',
            textTransform: 'uppercase',
            textAlign: 'center',
            mt: 2
          }}
        >
          Nạp thẻ qua ATM/MOMO
        </Typography>
        <Box
          mt={2}
          sx={{
            border: '1px solid #fff',
            padding: '15px',
            width: '100%',
            background: '#fff'
          }}
        >
          <Typography variant="h4" component="h4">
            Chuyển khoản qua ngân hàng và ví điện tử
          </Typography>
          <Typography fontSize={13}>Chuyển khoản online</Typography>
          <Box mt={2}>
            <table className="table-payment">
              <tr>
                <th style={{ width: '30%' }}>Thông tin</th>
                <th>Số tài khoản</th>
              </tr>
              <tr>
                <td>
                  <Typography fontSize={15}>
                    VCBank <br />
                    (Nguyễn Minh Trung)
                  </Typography>
                </td>
                <td>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography fontSize={17} mr={1}>
                      0251002753092
                    </Typography>
                    <Tooltip title={copyText} arrow placement="right">
                      <IconButton
                        aria-label="copy"
                        onClick={() => {
                          copySomething('0251002753092');
                        }}
                      >
                        <ContentCopyIcon
                          sx={{
                            color: '#000'
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography fontSize={15}>
                    Momo
                    <br /> ( Nguyễn Minh Trung)
                  </Typography>
                </td>
                <td>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography fontSize={17} mr={1}>
                      0382512487
                    </Typography>{' '}
                    <Tooltip title={copyText} arrow placement="right">
                      <IconButton
                        aria-label="copy"
                        onClick={() => {
                          copySomething('0382512487');
                        }}
                      >
                        <ContentCopyIcon
                          sx={{
                            color: '#000'
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </td>
              </tr>
            </table>
          </Box>
          <Typography
            fontSize={17}
            sx={{ my: 2 }}
            fontWeight={'bold'}
            textTransform={'uppercase'}
            textAlign={'center'}
          >
            Lấy nội dung chuyển tiền
          </Typography>
          <Box textAlign={'center'}>
            <Box
              sx={{
                width: '250px',
                background: 'rgb(0 0 0 / 27%)',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                margin: '8px auto'
              }}
            >
              Huhu
            </Box>
            <Button variant="contained">Lấy mã</Button>
          </Box>

          <Typography color="error" fontSize={17} fontWeight={600} mt={3}>
            <b>Lưu ý!!!</b> Hệ thống cộng tiền tự động, nên vui lòng chuyển đúng
            nội dung ở trên
          </Typography>
          <Typography>
            Nếu chuyển sai, vui lòng liên hệ <b>ADMIN</b> hoặc số điện thoại{' '}
            <b>0123456789 (8h-24h)</b> để được hỗ trợ.
          </Typography>
        </Box>
      </TabPanel>
    </Box>
  );
}
