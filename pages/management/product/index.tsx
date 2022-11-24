import PageTitleWrapper from '@/components/PageTitleWrapper';
import PageHeader from '@/content/Management/NomalAccount/PageHeader';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Container, Grid } from '@mui/material';
import Head from 'next/head';

import RecentOrders from '@/content/Management/NomalAccount/RecentOrders';

function ApplicationsTransactions() {
  return (
    <>
      <Head>
        <title>Danh sách sản phẩm</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

ApplicationsTransactions.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsTransactions;
