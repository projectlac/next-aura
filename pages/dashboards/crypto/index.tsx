import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import PageTitleWrapper from '@/components/PageTitleWrapper';
import PageHeader from '@/content/Dashboards/Crypto/PageHeader';
import { Container, Grid } from '@mui/material';

function DashboardCrypto() {
  return (
    <>
      <Head>
        <title>Crypto Dashboard</title>
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
          spacing={4}
        ></Grid>
      </Container>
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
