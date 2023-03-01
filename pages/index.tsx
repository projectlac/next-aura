import { Box, styled } from '@mui/material';
import { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import banner1 from '@/assets/images/banner-home-the-gioi-nen-thom-hand-made-sap-dau-nanh-cao-cap-art-of-scent-1 1.png';
import banner2 from '@/assets/images/image 3.png';
import OgTag from '@/components/Common/OgTag';
import ProductHot from '@/components/Product/ProductHot';
import ProductList from '@/components/Product/ProductList';
import Head from 'next/head';
import { useAuth } from '@/contexts/AuthGuard';

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

      <img
        src={
          banner.filter((d) => d._id === '63ff4264fb2a8f14beff7a6f')[0]
            .images[0]
        }
        alt=""
      />
      <ProductHot />
      <img
        src={
          banner.filter((d) => d._id === '63ff58652546ac20343860f4')[0]
            .images[0]
        }
        alt=""
      />
      <ProductList />
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
