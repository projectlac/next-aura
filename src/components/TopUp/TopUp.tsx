import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import Selection from '@/components/Common/Form/Selection';
import TextField from '@/components/Common/Form/TextField';
import { useAuth } from '@/contexts/AuthGuard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Tooltip
} from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { getCode } from 'api/apiUser/userApi';
import * as React from 'react';
import * as yup from 'yup';

const validationSchema = yup.object({
  homeNetwork: yup.string().required('Trường này là bắt buộc'),
  cost: yup.string().required('Trường này là bắt buộc'),
  seri: yup.string().required('Trường này là bắt buộc'),
  code: yup.string().required('Trường này là bắt buộc')
});
const validationBankSchema = yup.object({
  bank: yup.string().required('Trường này là bắt buộc')
});
const initForm = {
  homeNetwork: 'VIETTEL',
  cost: '',
  seri: '',
  code: ''
};

const initBankForm = {
  bank: 'MOMO'
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const onSubmit = (values) => {
  console.log(values);
  console.log('submit?');
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      sx={{ width: '80%' }}
    >
      {value === index && (
        <Box sx={{ p: 3, color: '#fff', width: '100%' }}>
          <Box>{children}</Box>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

enum CopyTextDefaut {
  COPY = 'Copy',
  COPIED = 'Compied!'
}
function TopUp() {
  const { handleSetMessage } = useAuth();
  const [code, setCode] = React.useState<string>('');
  const [value, setValue] = React.useState(0);
  const [copyText, setCopyTexy] = React.useState(CopyTextDefaut.COPY);

  const copySomething = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopyTexy(CopyTextDefaut.COPIED);
    setTimeout(() => {
      setCopyTexy(CopyTextDefaut.COPY);
    }, 500);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event.type);
    setValue(newValue);
  };

  const onSubmitBank = async (values) => {
    const { bank } = values;
    try {
      await getCode(bank).then((res) => {
        setCode(res.data);
        handleSetMessage({
          type: 'success',
          message: 'Lấy mã thành công'
        });
      });
    } catch (error) {
      handleSetMessage({
        type: 'error',
        message: 'Có lỗi xảy ra, vui lòng kiểm tra lại thông tin nhập'
      });
    }
  };

  const formik = useCustomForm(validationSchema, initForm, onSubmit);
  const formikBank = useCustomForm(
    validationBankSchema,
    initBankForm,
    onSubmitBank
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        background: 'rgb(0 0 0 / 27%)',
        borderRadius: '8px'
      }}
    >
      <Box sx={{ width: '20%' }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '22px',
            color: '#fff',
            padding: '10px 20px',
            textTransform: 'uppercase'
          }}
        >
          Giao dịch
        </Typography>
        <Divider sx={{ mb: 1 }}></Divider>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            height: 'auto',
            borderColor: 'transparent',
            '& .MuiTab-root': {
              color: '#fff',
              alignItems: 'start'
            },
            '& .MuiTab-root.Mui-selected': {
              textDecoration: 'underline',
              color: '#fff',
              background: '#00000026',
              borderRadius: 0
            }
          }}
        >
          <Tab label="Nạp thẻ cào tự động" {...a11yProps(0)} />
          <Tab label="Nạp thẻ qua ATM/MOMO" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Divider orientation="vertical"></Divider>
      <TabPanel value={value} index={0}>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            color: '#fff'
          }}
        >
          Nạp thẻ cào tự động
        </Typography>
        <Box
          mt={2}
          sx={{
            border: '1px solid #fff',
            padding: '25px',
            width: '100%',
            minHeight: '350px'
          }}
        >
          <Grid container columnSpacing={1.5}>
            <Grid item md={6} xs={12}>
              <Card sx={{ p: 3 }}>
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
                          { value: 'VIETTEL', title: 'Viettel' },
                          { value: 'MOBIFONE', title: 'MobiPhone' },
                          { value: 'VINAPHONE', title: 'VinaPhone' },
                          { value: 'VIETNAMOBILE', title: 'VietnamMobile' },
                          { value: 'ZING', title: 'Zing' },
                          { value: 'GATE', title: 'Gate' },
                          { value: 'GARENA', title: 'Garena' }
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
                          { value: '30000', title: '30.000 VND' },
                          { value: '50000', title: '50.000 VND' },
                          { value: '100000', title: '100.000 VND' },
                          { value: '200000', title: '200.000 VND' },
                          { value: '300000', title: '300.000 VND' },
                          { value: '500000', title: '500.000 VND' },
                          { value: '1000000', title: '1.000.000 VND' }
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
                      <Button fullWidth variant="contained" type="submit">
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
            color: '#fff'
          }}
        >
          Nạp thẻ qua ATM/MOMO
        </Typography>
        <Box
          mt={2}
          sx={{
            border: '1px solid #fff',
            padding: '25px',
            width: '100%'
          }}
        >
          <Typography variant="h4" component="h4">
            Chuyển khoản qua ngân hàng và ví điện tử
          </Typography>
          <Typography fontSize={13}>Chuyển khoản online</Typography>
          <Box mt={2}>
            <table className="table-payment">
              <thead>
                <tr>
                  <th style={{ width: '30%' }}>Thông tin</th>
                  <th>Số tài khoản</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Typography fontSize={15}>
                      ACB Bank <br />
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
                      <Typography fontSize={17} mr={2}>
                        28693487
                      </Typography>
                      <Tooltip title={copyText} arrow placement="right">
                        <IconButton
                          aria-label="copy"
                          onClick={() => {
                            copySomething('28693487');
                          }}
                        >
                          <ContentCopyIcon
                            sx={{
                              color: '#fff'
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
                      <Typography fontSize={17} mr={2}>
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
                              color: '#fff'
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </td>
                </tr>
              </tbody>
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
            <FormatForm formik={formikBank}>
              <Selection
                formik={formikBank}
                label="Chọn ngân hàng"
                variant="outlined"
                sx={{
                  width: '250px',

                  '& label': {
                    color: '#fff',

                    '&:hover': {
                      color: '#fff'
                    },
                    '&.Mui-focused': {
                      color: '#fff'
                    }
                  },
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: 'white',
                      color: '#fff'
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                      color: '#fff'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                      color: '#fff'
                    }
                  },
                  '& svg': {
                    color: '#fff'
                  }
                }}
                name="bank"
                options={[
                  { value: 'MOMO', title: 'Momo' },
                  { value: 'ACB', title: 'ACB' }
                ]}
              />
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
                {code}
              </Box>
              <Button variant="contained" type="submit">
                Lấy mã
              </Button>
            </FormatForm>
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

export default TopUp;
