import { Box, Container, styled } from '@mui/material';
import { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import Head from 'next/head';
import banner1 from '@/assets/images/banner-home-the-gioi-nen-thom-hand-made-sap-dau-nanh-cao-cap-art-of-scent-1 1.png';
import banner2 from '@/assets/images/image 3.png';
import ProductList from '@/components/Product/ProductList';
import OgTag from '@/components/Common/OgTag';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    background:'#fff';
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  return (
    <OverviewWrapper>
      <Head>
        <title>AuraViet</title>
        <OgTag title="AuraViet.com" />
      </Head>

      <img src={banner1} alt="" />
      <ProductList />
      <img src={banner2} alt="" />
      <ProductList />
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
