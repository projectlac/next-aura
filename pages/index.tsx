import { Box, styled } from '@mui/material';
import { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import OgTag from '@/components/Common/OgTag';
import ProductHot from '@/components/Product/ProductHot';
import ProductList from '@/components/Product/ProductList';
import { useAuth } from '@/contexts/AuthGuard';
import Head from 'next/head';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    background:'#fff';
    flex: 1;
    overflow-x: hidden;
    
`
);

function Overview() {
  const { banner } = useAuth();
  return (
    <OverviewWrapper>
      <Head>
        <title>AuraViet</title>
        <OgTag title="AuraViet.com" />
      </Head>

      <Box
        sx={{
          display: { md: 'block', xs: 'none' }
        }}
      >
        <img
          src={
            banner.filter((d) => d._id === '63ff4264fb2a8f14beff7a6f')[0]
              ?.images[0]
          }
          alt=""
          className="home-img"
        />
      </Box>
      <Box
        sx={{
          display: { md: 'none', xs: 'block' }
        }}
      >
        <img
          src={
            banner.filter((d) => d._id === '641dcccf2546ac20343865f9')[0]
              ?.images[0]
          }
          alt=""
          className="home-img"
        />
      </Box>
      <ProductHot />
      <Box
        sx={{
          display: { md: 'block', xs: 'none' }
        }}
      >
        <img
          src={
            banner.filter((d) => d._id === '63ff58652546ac20343860f4')[0]
              ?.images[0]
          }
          alt=""
          className="home-img"
        />
      </Box>
      <Box
        sx={{
          display: { md: 'none', xs: 'block' }
        }}
      >
        <img
          src={
            banner.filter((d) => d._id === '641dccdb2546ac20343865fd')[0]
              ?.images[0]
          }
          alt=""
          className="home-img"
        />
      </Box>
      <ProductList />
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
