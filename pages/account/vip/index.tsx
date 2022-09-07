import Items from '@/components/Shop/Items/Items';
import BaseLayout from '@/layouts/BaseLayout';
import { Box, Container, Grid } from '@mui/material';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import bg from '@/assets/images/genshin-impact.webp';
function AccountVip() {
  return (
    <Box>
      <Head>
        <title>Account Vip Nhất</title>
      </Head>

      <Container maxWidth="lg" sx={{ mt: 30 }}>
        <Box py={3}>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} md={4}></Grid>
            <Grid item xs={12} md={8}>
              <Grid container columnSpacing={2} rowSpacing={2}>
                {[...Array(9)].map((d, i) => {
                  return (
                    <Grid item xs={12} md={4} key={i}>
                      <Items
                        title="Acc 1"
                        url="#"
                        imageUrl={bg}
                        price="123.123"
                        code="12"
                        des="Đây là acc vip"
                      ></Items>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default AccountVip;
AccountVip.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
