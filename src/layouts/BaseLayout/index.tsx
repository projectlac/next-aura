import Footer from '@/components/Footer';
import { Box, Container, styled } from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { FC, ReactNode } from 'react';
import bg from '@/assets/images/light-bg-genshin.webp';
import HeaderUserbox from './Userbox';
import { useAuth } from '@/contexts/AuthGuard';

interface BaseLayoutProps {
  children?: ReactNode;
}
const Header = styled(Box)({
  backgroundColor: 'rgb(0 0 0 / 27%)',
  position: 'fixed',
  width: '100%',
  zIndex: 999
});
const MenuWrapper = styled(Box)({
  display: 'flex',
  height: '70px',
  alignItems: 'center',
  justifyContent: 'space-between'
});
const FullBG = styled(Box)({
  background: `url(${bg})`,
  overflow: 'auto',
  flex: '1',
  overflowX: 'hidden',
  backgroundAttachment: 'fixed'
});
const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return (
    <Box>
      <Header>
        <Container>
          <MenuWrapper
            sx={{
              '& ul': {
                display: 'flex',
                listStyle: 'none',
                '& li': {
                  margin: '0 25px',

                  fontWeight: 'bold',
                  '& a': {
                    color: '#e9ebf1',
                    textDecoration: 'none',
                    fontSize: 17
                  }
                }
              }
            }}
          >
            <ul>
              <li>
                <Link href={'/'}>Trang chủ</Link>
              </li>
              <li>
                <Link href={'/topup'}>Nạp tiền</Link>
              </li>
              <li>
                <Link href={'/topup-genshin'}>Nạp game</Link>
              </li>
            </ul>
            <Box>
              {isAuthenticated ? (
                <HeaderUserbox />
              ) : (
                <ul>
                  <li>
                    <Link href={'/login'}>Đăng nhập</Link>
                  </li>
                </ul>
              )}
            </Box>
          </MenuWrapper>
        </Container>
      </Header>
      <FullBG>
        {children} <Footer />
      </FullBG>
    </Box>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node
};

export default BaseLayout;
