import Items from '@/components/Shop/Items/Items';
import BaseLayout from '@/layouts/BaseLayout';
import { Box, Container, Grid, Hidden, styled } from '@mui/material';
import Head from 'next/head';
import React, { ReactElement, useState } from 'react';
import bg from '@/assets/images/genshin-impact.webp';
import FilterVip from '@/components/Shop/Filters/FilterVip';
import PaginationPage from '@/components/Common/PaginationPage';
import TitleSpecial from '@/components/Common/TitleSpecial';
import FilterAccount from '@/components/Common/Filter/FilterAccount';

function AccountVip() {
  const [open, setOpen] = useState<boolean>(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  return (
    <Box>
      <Head>
        <title>Account Vip Nhất</title>
      </Head>

      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <TitleSpecial>Account Vip</TitleSpecial>
        <Box py={3}>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} md={3}>
              <FilterAccount open={open} toggleOpen={toggleOpen}>
                <FilterVip />
              </FilterAccount>
            </Grid>

            <Grid item xs={12} md={9}>
              <Grid container columnSpacing={1.5} rowSpacing={2}>
                {[...Array(9)].map((d, i) => {
                  return (
                    <Grid item xs={12} md={4} key={i}>
                      <Items
                        title={`Acc ${d ? d : 1}`}
                        url="/account/details/123"
                        imageUrl={bg}
                        price="123.123"
                        code="12"
                        des="Đây là acc vip"
                        isSold={i % 2 === 0 ? true : false}
                      ></Items>
                    </Grid>
                  );
                })}
              </Grid>
              <PaginationPage numberOfPage={10} />
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
