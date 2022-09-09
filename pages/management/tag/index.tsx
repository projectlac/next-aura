import PageTitleWrapper from '@/components/PageTitleWrapper';
import PageHeader from '@/content/Management/Tag/PageHeader';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Container, Grid } from '@mui/material';
import Head from 'next/head';

import RecentOrdersTag from '@/content/Management/Tag/RecentOrdersTag';

function ApplicationsTransactions() {
  return (
    <>
      <Head>
        <title>Vũ khí và nhân vật</title>
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
            <RecentOrdersTag />
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
