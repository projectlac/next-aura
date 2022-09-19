import bg from '@/assets/images/genshin-impact.webp';
import FilterAccount from '@/components/Common/Filter/FilterAccount';
import PaginationPage from '@/components/Common/PaginationPage';
import TitleSpecial from '@/components/Common/TitleSpecial';
import FilterReroll from '@/components/Shop/Filters/FilterReroll';
import Items from '@/components/Shop/Items/Items';
import BaseLayout from '@/layouts/BaseLayout';
import { Box, Container, Grid } from '@mui/material';
import Head from 'next/head';
import { ReactElement, useState } from 'react';
function AccountReroll() {
  const [open, setOpen] = useState<boolean>(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  return (
    <Box>
      <Head>
        <title>Account Reroll Mới Nhất</title>
      </Head>

      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <TitleSpecial>Account Reroll</TitleSpecial>
        <Box py={3}>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} md={3}>
              <FilterAccount open={open} toggleOpen={toggleOpen}>
                <FilterReroll />
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

export default AccountReroll;
AccountReroll.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
