import { Box } from '@mui/material';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import logo from '../../assets/images/logo.png';
import { useEffect, useRef, useState } from 'react';
const Header = styled(Box)({
  borderBottom: '1px solid #333',
  textAlign: 'center',
  background: '#fff',
  '& img': {
    margin: '0 auto',

    '@media(min-width:0px)': {
      height: '45px',
      width: '92px'
    },
    '@media(min-width:600px)': {
      height: '91px',
      width: '186px'
    }
  }
});

function HeaderWrapper() {
  const [open, setOpen] = useState<boolean>(false);
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

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Header>
      <Box
        sx={{
          mb: '31px',
          pt: { md: '60px', xs: '30px' },
          position: 'relative'
        }}
      >
        <Box
          onClick={toggleMenu}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '40px',
            cursor: 'pointer',
            display: { md: 'none', xs: 'block' }
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="23"
              height="23"
              rx="3.5"
              fill="#F9F9F9"
              stroke="#F3F3F3"
            />
            <rect
              x="4.36365"
              y="7.63647"
              width="15.2727"
              height="1.09091"
              rx="0.545455"
              fill="#242424"
            />
            <rect
              x="4.36365"
              y="12"
              width="15.2727"
              height="1.09091"
              rx="0.545455"
              fill="#242424"
            />
            <rect
              x="4.36365"
              y="16.3635"
              width="15.2727"
              height="1.09091"
              rx="0.545455"
              fill="#242424"
            />
          </svg>
        </Box>
        <Link href={'/'}>
          <img src={logo} alt="" />
        </Link>
        <Box
          sx={{
            left: '40px',
            width: '237px',
            position: 'absolute',
            zIndex: '2',
            background: '#fff',
            padding: '10px 16px',
            textAlign: 'left',
            borderRadius: ' 4px',
            display: `${open ? 'block' : 'none'}`,
            transition: 'all 0.2s',
            '& ul': {
              padding: '0',
              margin: 0,
              '& li': {
                padding: '15px 0',
                textTransform: 'uppercase',
                '&:not(:last-child)': {
                  borderBottom: '1px solid #B6B6B6'
                }
              }
            }
          }}
        >
          <ul>
            <li onClick={toggleMenu}>
              <Link href={'/shop/new'}>Sản phẩm mới</Link>
            </li>
            <li onClick={toggleMenu}>
              <Link href={'/shop/all'}>TỔNG HỢP SẢN PHẨM</Link>
            </li>
            <li onClick={toggleMenu}>
              <Link href={'/shop/sale'}>SẢN PHẨM GIẢM GIÁ</Link>
            </li>
            <li onClick={toggleMenu}>
              <Link href={'/shop/hot'}>BÁN CHẠY NHẤT</Link>
            </li>
            <li onClick={toggleMenu}>LIÊN HỆ CHÚNG TÔI</li>
          </ul>
        </Box>
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            background: '#000000d4',
            zIndex: 1,
            display: `${open ? 'block' : 'none'}`
          }}
          onClick={toggleMenu}
        ></Box>
      </Box>

      <Box
        ref={ref}
        sx={{
          '& ul': {
            display: { md: 'flex', xs: 'none' },
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
