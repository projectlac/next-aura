import PageTitleWrapper from '@/components/PageTitleWrapper';
import PageHeader from '@/content/Management/Users/settings/PageHeader';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Container, Grid } from '@mui/material';
import Head from 'next/head';

import SecurityTab from '@/content/Management/Users/settings/SecurityTab';

function ManagementUserSettings() {
  return (
    <>
      <Head>
        <title>User Settings - Applications</title>
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
          {/* <Grid item xs={12}>
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid> */}
          <Grid item xs={12}>
            {/* {currentTab === 'activity' && <ActivityTab />} */}
            {/* {currentTab === 'edit_profile' && <EditProfileTab />} */}
            {/* {currentTab === 'notifications' && <NotificationsTab />} */}
            {/* {currentTab === 'security' && <SecurityTab />} */}
            <SecurityTab />
          </Grid>
        </Grid>
      </Container>
      {/* <Footer /> */}
    </>
  );
}

ManagementUserSettings.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserSettings;
