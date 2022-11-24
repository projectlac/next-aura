import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import img from '../../assets/images/banner 1920x380.png';
const FooterWrapper = styled(Box)({
  padding: '30px 0',
  background: '#fff'
});
function Footer() {
  return (
    <Box sx={{ background: '#fff' }}>
      <img src={img} alt="" />
      <FooterWrapper>
        <Container>
          <Box
            sx={{
              borderTop: '1px solid #333',
              display: 'flex',
              justifyContent: 'space-between',
              '& ul': {
                paddingTop: '15px',
                '& li': {
                  padding: '10px 0',
                  fontSize: '16px'
                }
              }
            }}
          >
            <ul>
              <li>TÌM KIẾM</li>
              <li>SẢN PHẨM MỚI</li>
              <li>TỔNG HỢP SẢN PHẨM</li>
              <li>SẢN PHẨM GIẢM GIÁ </li>
              <li>BÁN CHẠY NHẤT </li>
              <li>LIÊN HỆ CHÚNG TÔI</li>
            </ul>
            <ul>
              <li>Facebook</li>
              <li>Instagram</li>
            </ul>
          </Box>
          <Box
            sx={{
              marginTop: '110px',
              textAlign: 'center'
            }}
          >
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '21px'
              }}
            >
              Subscribe Now!
            </Typography>
            <Typography
              sx={{
                fontSize: '15px',
                lineHeight: '20px'
              }}
            >
              Đăng ký để là người đầu tiên tìm hiểu về các chương trình khuyến{' '}
              <br />
              mãi, ra mắt sản phẩm và hơn thế nữa !!
            </Typography>
            <Box
              sx={{
                mt: 2,
                '& button': {
                  textTransform: 'uppercase',
                  background: 'rgb(48, 59, 67)',
                  borderRadius: '2px',
                  border: 'none',
                  color: 'rgb(255, 255, 255)',
                  fontSize: '16px',
                  fontWeight: '700',
                  padding: '11px 10px',
                  height: '41px'
                },
                '& input': {
                  boxSizing: 'border-box',
                  borderRadius: '2px',
                  padding: '0px 0px 0px 16px',
                  height: '41px',
                  textAlign: 'left',
                  color: 'rgb(0, 0, 0)',
                  fontSize: '16px',
                  fontWeight: '400',
                  letterSpacing: '0px',
                  backgroundColor: 'rgb(255, 255, 255)',
                  border: '1px solid rgb(180, 187, 195)',
                  width: '315px'
                }
              }}
            >
              <input type="text" />
              <button>Sign me up</button>
            </Box>
          </Box>
        </Container>
      </FooterWrapper>
    </Box>
  );
}

export default Footer;
