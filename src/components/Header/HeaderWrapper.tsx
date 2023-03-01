import { Box } from '@mui/material';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import logo from '../../assets/images/logo.png';
import { useEffect, useRef } from 'react';
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
  const ref = useRef<any>();
  const handleScroll = () => {
    if (window.pageYOffset > ref?.current?.offsetTop) {
      ref?.current?.classList.add('sticky');
    } else {
      ref?.current?.classList.remove('sticky');
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', () => {
      handleScroll();
    });

    window.removeEventListener('scroll', () => {
      handleScroll();
    });
  }, []);

  return (
    <Header>
      <Box sx={{ mb: '31px', pt: '60px' }}>
        <Link href={'/'}>
          <img src={logo} alt="" />
        </Link>
      </Box>

      <Box
        ref={ref}
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
          },
          '&.sticky': {
            position: 'fixed',
            top: 0,
            width: '100%',
            background: '#fff',
            zIndex: '99',
            boxShadow: '0px 0px 5px 1px #04040426',
            '+ ul': {
              paddingTop: '102px'
            },
            ul: {
              marginTop: '15px'
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
