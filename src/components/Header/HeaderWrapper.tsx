import { Box, Container } from '@mui/material';
import { styled } from '@mui/styles';
import Link from 'next/link';

import React from 'react';

const Header = styled(Box)({
  backgroundColor: 'rgb(0 0 0 / 27%)',
  position: 'fixed',
  width: '100%'
});
const MenuWrapper = styled(Box)({
  display: 'flex',
  height: '70px',
  alignItems: 'center',
  justifyContent: 'space-between'
});
function HeaderWrapper() {
  return (
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
              <Link href={''}>Nạp tiền</Link>
            </li>
            <li>
              <Link href={''}>Nạp game</Link>
            </li>
          </ul>
          <Box>
            <ul>
              <li>
                <Link href={''}>Đăng nhập</Link>
              </li>
              <li>
                <Link href={''}>Đăng ký</Link>
              </li>
            </ul>
          </Box>
        </MenuWrapper>
      </Container>
    </Header>
  );
}

export default HeaderWrapper;
