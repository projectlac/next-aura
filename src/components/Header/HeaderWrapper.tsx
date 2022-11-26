import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import logo from '../../assets/images/logo.png';

const Header = styled(Box)({
  borderBottom: '1px solid #333',
  textAlign: 'center',
  background: '#fff',
  '& img': {
    margin: '0 auto',
    width: '186px',
    height: '91px'
  }
});
function HeaderWrapper() {
  return (
    <Header>
      <Box sx={{ mb: '31px', pt: '60px' }}>
        <Link href={'/'}>
          <img src={logo} alt="" />
        </Link>
      </Box>
      <FormControl variant="standard">
        <TextField
          id="input-with-icon-textfield"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          placeholder="Bạn đang tìm kiếm sản phẩm nào?"
          variant="outlined"
          sx={{
            width: '370px',
            height: '52px',
            background: '#F2F2F2',

            '& .MuiInputBase-root': {
              height: '52px'
            },
            '& fieldset': {
              border: 'none'
            }
          }}
        />
      </FormControl>
      <Box
        sx={{
          '& ul': {
            display: 'flex',
            justifyContent: 'center',
            listStyle: 'none',
            marginTop: '32px',
            '& li': {
              margin: '0 40px',
              textTransform: 'uppercase',
              '& a': {
                color: '#333',
                textDecoration: 'none',
                '&:hover': {
                  color: '#d33'
                }
              }
            }
          }
        }}
      >
        <ul>
          <li>
            <Link href={'/shop/new'}>Sản phẩm mới</Link>
          </li>
          <li>
            <Link href={'/shop/all'}>TỔNG HỢP SẢN PHẨM</Link>
          </li>
          <li>
            <Link href={'/shop/sale'}>SẢN PHẨM GIẢM GIÁ</Link>
          </li>
          <li>
            <Link href={'/shop/hot'}>BÁN CHẠY NHẤT</Link>
          </li>
          <li>LIÊN HỆ CHÚNG TÔI</li>
        </ul>
      </Box>
    </Header>
  );
}

export default HeaderWrapper;
