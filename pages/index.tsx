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

      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <Box
          sx={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: '0',
            '& iframe': {
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%'
            }
          }}
        >
          <iframe
            width="1500"
            height="900"
            src="https://www.youtube.com/embed/J9WuPBOC_S8"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>
        <Box py={3} mt={5}>
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
