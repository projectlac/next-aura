import { Box, Container, Grid, styled, Typography } from '@mui/material';
import Link from 'next/link';

const FooterWrapper = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
        background: rgb(27 25 60 / 58%);
        color: #fff;
`
);
const TitleFooter = styled(Typography)(
  () => `
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 45px;
  font-weight: bold;
  color: #fff;
  position:relative;
  font-size:45px;
  text-shadow: 0 0 10px #69e0ff, 0 0 20px #69e0ff, 0 0 40px #69e0ff;
  &:before{
    content: "";
    margin-right: 36px;
    width: 322px;
    height: 15px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUIAAAAPCAYAAACRHMaaAAADd0lEQVR4Xu2aSYsUQRCFv3BBxQ0XXHBDxYM7KoiiCF79vZ49qTCooA7idnCZEdxwPKiMa0gMWVCmmVnVZc9IV0WfujtjfZn5KiKzBP84Ao6AIzBwBGTg+Xv6joAj0HMEVHUdMC8iP3KpOhH2fBF4eo7AkBEIJHgWeCoiM06EQ14NnrsjMEAEVHU1cAk4CbwBronIbAoKrwgHuEA8ZUegLwio6iHgE/BaRLTKS1XXAxeAY8AKwMbeATeBx3VZ03Ei7MuK8DwcgQEhoKpbQ6V3EHgBXBeRzwaBqu4EzgE2tjJUg3ZOaOQ4B9wHbovIfAXZAhGqqhNi8yJaDIy62myrV8nZ07CNTpNMabyrbkovF3dJNp7Bf5Gt6+byKtmPx+x3PAdNPkrjbcfiYicVVw63pvj+4JCakSYfbeeltJ42AXuBHYC1v6+AqyIyp6pHgDOAkeFy4BEwBawFLgK7ASNMI8+pqlWeVCJs2nRNtNZFf1SdLqTRZdPVcy0twra2224ykxvFXyxf6ab85eymbOT0S3Zj36XYcnnWbdR9LavhEscQ2zLZOlnVx+PvlVxKJhVL6r84tlJuufxyvlKY5nKr5xLLpH7HhL4qEOBH4KFdhABfgePAUWAj8BO4Gyo/k7OCbxtwKsiZDWuVTf/eqJu7iWBajy9iFbpUOTX5aRpPYdWkkxqv/itVfSlSyM1Vidy6km6T/xQpjlLNlGLObfa4osnFWCLUeEPXbY5CxCUyaCKKFHa5/2IsSkRYwic1N21wSlWRqRhKc2/yttaN3F6GVndXIDir9ozgrP29ZSRXb38DGdr44VAdbgnV4fumjdea2Poi2Jag7bC1reyEYfM/18RS+B63j3HZ62qnq16XB3FpKY8zjthP6mH/DbAK1y5LTgB7QiX+BLgDzIrIr9iQqh4ATgP7QlVpt8jTixn8hO1/D9cRcAQmCQFVtdvgDYHQrLozYpwRkQ+h+rOLku2hBbYq8jxgZ4ibgS/WNgMPTN6JcJJm3mN1BByBLALWoVWvxaiqXZQY8VkbbC9SrwH2h0uT5+EC5ZmIfI/7cIfYEXAEHIFeIKCqVg1eCZcn1kYbMVrhN23nhyLytp6oV4S9mHZPwhFwBOoIhPN7a4Evh/cJ7bzQLlCMBBfeN3Qi9DXjCDgCg0BAVe3s0CpDe9fwhojYazZ/fX4DLTCgp3UukRwAAAAASUVORK5CYII=) center/cover no-repeat;
  }
  &:after {
    content: "";
    width: 322px;
    transform: rotate( 180deg );
    margin-left: 36px;
    height: 15px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUIAAAAPCAYAAACRHMaaAAADd0lEQVR4Xu2aSYsUQRCFv3BBxQ0XXHBDxYM7KoiiCF79vZ49qTCooA7idnCZEdxwPKiMa0gMWVCmmVnVZc9IV0WfujtjfZn5KiKzBP84Ao6AIzBwBGTg+Xv6joAj0HMEVHUdMC8iP3KpOhH2fBF4eo7AkBEIJHgWeCoiM06EQ14NnrsjMEAEVHU1cAk4CbwBronIbAoKrwgHuEA8ZUegLwio6iHgE/BaRLTKS1XXAxeAY8AKwMbeATeBx3VZ03Ei7MuK8DwcgQEhoKpbQ6V3EHgBXBeRzwaBqu4EzgE2tjJUg3ZOaOQ4B9wHbovIfAXZAhGqqhNi8yJaDIy62myrV8nZ07CNTpNMabyrbkovF3dJNp7Bf5Gt6+byKtmPx+x3PAdNPkrjbcfiYicVVw63pvj+4JCakSYfbeeltJ42AXuBHYC1v6+AqyIyp6pHgDOAkeFy4BEwBawFLgK7ASNMI8+pqlWeVCJs2nRNtNZFf1SdLqTRZdPVcy0twra2224ykxvFXyxf6ab85eymbOT0S3Zj36XYcnnWbdR9LavhEscQ2zLZOlnVx+PvlVxKJhVL6r84tlJuufxyvlKY5nKr5xLLpH7HhL4qEOBH4KFdhABfgePAUWAj8BO4Gyo/k7OCbxtwKsiZDWuVTf/eqJu7iWBajy9iFbpUOTX5aRpPYdWkkxqv/itVfSlSyM1Vidy6km6T/xQpjlLNlGLObfa4osnFWCLUeEPXbY5CxCUyaCKKFHa5/2IsSkRYwic1N21wSlWRqRhKc2/yttaN3F6GVndXIDir9ozgrP29ZSRXb38DGdr44VAdbgnV4fumjdea2Poi2Jag7bC1reyEYfM/18RS+B63j3HZ62qnq16XB3FpKY8zjthP6mH/DbAK1y5LTgB7QiX+BLgDzIrIr9iQqh4ATgP7QlVpt8jTixn8hO1/D9cRcAQmCQFVtdvgDYHQrLozYpwRkQ+h+rOLku2hBbYq8jxgZ4ibgS/WNgMPTN6JcJJm3mN1BByBLALWoVWvxaiqXZQY8VkbbC9SrwH2h0uT5+EC5ZmIfI/7cIfYEXAEHIFeIKCqVg1eCZcn1kYbMVrhN23nhyLytp6oV4S9mHZPwhFwBOoIhPN7a4Evh/cJ7bzQLlCMBBfeN3Qi9DXjCDgCg0BAVe3s0CpDe9fwhojYazZ/fX4DLTCgp3UukRwAAAAASUVORK5CYII=) center/cover no-repeat;
}
`
);
function Footer() {
  return (
    <FooterWrapper className="footer-wrapper">
      <Box
        pb={3}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="center"
      >
        <TitleFooter mt={2}>Tên web</TitleFooter>
      </Box>
      <Container>
        <Grid container columnSpacing={1.5}>
          <Grid item md={4} xs={12}>
            <Typography
              className="highlight-text"
              fontWeight={'bold'}
              fontSize={25}
            >
              Về chúng tôi
            </Typography>
            <p className="footer-p">
              Shop mua bán acc Genshin Impact lớn nhất Việt Nam!
            </p>
            <p className="footer-p">
              Shop Genshin Impact rẻ nhất và uy tin nhất!
            </p>
            <p className="footer-p">Dịch vụ : Mua Bán - Nạp Game - Uy Tín</p>
            <p className="mt-3 small">© tenweb.com</p>
          </Grid>

          <Grid item md={4} xs={12}>
            <Box px={2}>
              <Typography
                className="highlight-text"
                fontWeight={'bold'}
                fontSize={25}
              >
                Chúng tôi
              </Typography>
              <p className="footer-p">
                Làm việc tận tâm hỗ trợ khách hàng nhiệt tình nhất có thể!
              </p>
            </Box>
          </Grid>
          <Grid item md={4} xs={12}>
            <Typography
              className="highlight-text"
              fontWeight={'bold'}
              fontSize={25}
            >
              Liên hệ
            </Typography>
            <p className="footer-p">
              Hotline:{' '}
              <Link href={'tel:0904448980'}>
                <b>0904448980</b>
              </Link>
            </p>
          </Grid>
        </Grid>
      </Container>
    </FooterWrapper>
  );
}

export default Footer;
