import { Box, Container, Grid, styled, Typography } from '@mui/material';
import Link from 'next/link';
import TitleSpecial from '../Common/TitleSpecial';

const FooterWrapper = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
        background: rgb(27 25 60 / 58%);
        color: #fff;
`
);

function Footer() {
  return (
    <FooterWrapper className="footer-wrapper">
      <Box
        pt={3}
        pb={2}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="center"
      >
        <TitleSpecial mt={2}>MuabanGenshin.com</TitleSpecial>
      </Box>
      <Container>
        <Grid container columnSpacing={1.5}>
          <Grid item md={4} xs={12}>
            <Typography
              className="highlight-text"
              fontWeight={'bold'}
              sx={{
                fontSize: { md: 25, xs: 18 }
              }}
            >
              Về chúng tôi
            </Typography>
            <p className="footer-p">
              Shop mua bán acc với mức giá huỷ diệt thị trường
            </p>
            <p className="footer-p">
              Shop mua bán acc Genshin impact uy tín hỗ trợ nhanh gọn
            </p>
            <p className="footer-p">Dịch vụ : Mua Bán - Nạp Game - Uy Tín</p>
            <p className="mt-3 small">© muabangenshin.com</p>
          </Grid>

          <Grid item md={4} xs={12}>
            <Box sx={{ px: { xs: 0, md: 2 } }}>
              <Typography
                className="highlight-text"
                fontWeight={'bold'}
                sx={{
                  fontSize: { md: 25, xs: 18 }
                }}
              >
                Chúng tôi
              </Typography>
              <p className="footer-p">
                Hỗ trợ khách hàng 8h-24h. Tất cả các ngày trong tuần kể cả các
                dịp lễ, Tết, Noel
              </p>
            </Box>
          </Grid>
          <Grid item md={4} xs={12}>
            <Typography
              className="highlight-text"
              fontWeight={'bold'}
              sx={{
                fontSize: { md: 25, xs: 18 }
              }}
            >
              Liên hệ
            </Typography>
            <p className="footer-p">
              Di động:{' '}
              <Link href={'tel:0382512487'}>
                <b>0382512487</b>
              </Link>
            </p>{' '}
            <p className="footer-p">
              Zalo:{' '}
              <Link href={'https://zalo.me/0382512487'}>
                <b>0382512487</b>
              </Link>
            </p>
          </Grid>
        </Grid>
      </Container>
    </FooterWrapper>
  );
}

export default Footer;
