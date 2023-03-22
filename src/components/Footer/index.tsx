import { useAuth } from '@/contexts/AuthGuard';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
const FooterWrapper = styled(Box)({
  padding: '30px 0',
  background: '#fff'
});
function Footer() {
  const { banner } = useAuth();

  return (
    <Box sx={{ background: '#fff' }}>
      <img
        src={
          banner.filter((d) => d._id === '63ff58ac2546ac20343860f9')[0]
            ?.images[0]
        }
        alt=""
        className="home-img"
      />
      <FooterWrapper>
        <Container>
          <Box
            sx={{
              borderTop: '1px solid #333',
              display: 'flex',
              justifyContent: { md: 'space-between', xs: 'center' },
              '& ul': {
                paddingTop: '15px',
                textAlign: { xs: 'center', md: 'left' },
                paddingLeft: 0,
                '&.hidden-xs': {
                  textAlign: { xs: 'center', md: 'right' },
                  display: {
                    md: 'block',
                    xs: 'none'
                  }
                },
                '& li': {
                  padding: '10px 0',
                  fontSize: '16px'
                }
              }
            }}
          >
            <ul>
              <li>TÌM KIẾM</li>
              <li>
                <Link href={'/shop/new'}>SẢN PHẨM MỚI</Link>
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
            <ul className="hidden-xs">
              <li>Facebook</li>
              <li>Instagram</li>
            </ul>
          </Box>
          <Box
            sx={{
              marginTop: { md: '110px', xs: '37px' },
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
              Đăng ký để là người đầu tiên tìm hiểu về các chương trình khuyến
              mãi, <br /> ra mắt sản phẩm và hơn thế nữa !!
            </Typography>
            <Box
              sx={{
                mt: 2,

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& button': {
                  textTransform: 'uppercase',
                  background: 'rgb(48, 59, 67)',
                  borderRadius: '2px',
                  border: 'none',
                  color: 'rgb(255, 255, 255)',
                  fontSize: { xs: '11px', md: '16px' },
                  fontWeight: '700',
                  padding: '11px 10px',
                  height: '41px',
                  width: { md: '150px', xs: '100px' }
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
                  width: { md: '315px', xs: '90%' }
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
