import Table from '@/components/Table/Table';
import { useAuth } from '@/contexts/AuthGuard';
import { ProtectGuess } from '@/contexts/ProtectGuess';
import { Box, Card, Container, styled } from '@mui/material';
import { getHistory } from 'api/user';
import Head from 'next/head';
import { ReactElement, useEffect, useState } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;

    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  const { update } = useAuth();
  const [data, setData] = useState([]);
  useEffect(() => {
    getHistory().then((res) => setData(res.data.data));
  }, [update]);
  return (
    <ProtectGuess>
      <OverviewWrapper>
        <Head>
          <title>Lịch sử mua hàng</title>
        </Head>

        <Container maxWidth="md" sx={{ mt: 15 }}>
          <Box py={3}>
            <Card>
              <Table data={data} />
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
