import PageTitleWrapper from '@/components/PageTitleWrapper';
import PageHeader from '@/content/Management/UsersTable/PageHeader';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Container, Grid } from '@mui/material';
import Head from 'next/head';

import RecentOrders from '@/content/Management/UsersTable/RecentOrders';
import { ProtectAdminContent } from '@/contexts/ProtectAdminContent';

function UserManagement() {
  return (
    <ProtectAdminContent>
      <Head>
        <title>Danh sách user</title>
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
    </ProtectAdminContent>
  );
}

UserManagement.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default UserManagement;
