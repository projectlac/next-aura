import Table from '@/components/Table/Table';
import { ProtectGuess } from '@/contexts/ProtectGuess';
import { Box, Card, Container, styled } from '@mui/material';
import Head from 'next/head';
import { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;

    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  return (
    <ProtectGuess>
      <OverviewWrapper>
        <Head>
          <title>Lịch sử mua hàng</title>
        </Head>

        <Container maxWidth="md" sx={{ mt: 15 }}>
          <Box py={3}>
            <Card>
              <Table />
            </Card>
          </Box>
        </Container>
      </OverviewWrapper>
    </ProtectGuess>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
