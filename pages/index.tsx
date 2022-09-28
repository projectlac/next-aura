import { Box, Container, styled } from '@mui/material';
import type { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import Head from 'next/head';

import ProductCollection from '@/components/ProductCollection/ProductCollection';
import OgTag from '@/components/Common/OgTag';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;

    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  return (
    <OverviewWrapper>
      <Head>
        <title>
          MuabanGenshin.com - Website bán acc Genshin uy tín, hàng đầu Việt Nam
        </title>
        <OgTag title="MuabanGenshin.com - Website bán acc Genshin uy tín, hàng đầu Việt Nam" />
      </Head>

      <Container maxWidth="lg" sx={{ mt: 30 }}>
        <Box py={3}>
          <ProductCollection></ProductCollection>
        </Box>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
