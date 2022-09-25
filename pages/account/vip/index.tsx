import FilterAccount from '@/components/Common/Filter/FilterAccount';
import PaginationPage from '@/components/Common/PaginationPage';
import TitleSpecial from '@/components/Common/TitleSpecial';
import FilterVip from '@/components/Shop/Filters/FilterVip';
import Items from '@/components/Shop/Items/Items';
import BaseLayout from '@/layouts/BaseLayout';
import { Box, Container, Grid } from '@mui/material';
import { queryAccountVip } from 'api/apiAccount/account';
import { IAccountShop } from 'model/account';
import Head from 'next/head';
import { ReactElement, useEffect, useState } from 'react';

function AccountVip() {
  const [data, setData] = useState<IAccountShop[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [filter, setFilter] = useState({
    ar: '',
    server: 'ASIA',
    rangeMoney: '',
    hero: '',
    weapon: '',
    priceSort: true,
    keyword: ''
  });
  const handleFilter = (data) => {
    setFilter(data);
    setPage(0);
  };
  useEffect(() => {
    const param = {
      ...filter,
      limit: 9,
      offset: page
    };
    queryAccountVip(param).then((res) => {
      setData(res.data.data);
      setTotal(res.data.total);
    });
  }, [page, filter]);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event.type);
    setPage((value - 1) * 9);
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
                <FilterVip handleFilter={handleFilter} />
              </FilterAccount>
            </Grid>

            <Grid item xs={12} md={9}>
              <Grid container columnSpacing={1.5} rowSpacing={2}>
                {data.map((d, i) => {
                  return (
                    <Grid item xs={12} md={4} key={i}>
                      <Items
                        title={d.name}
                        url={`/account/details/${d.slug}`}
                        imageUrl={d.avatar}
                        price={d.price}
                        code={d.code}
                        des={d.description}
                        isSold={d.is_sold}
                      ></Items>
                    </Grid>
                  );
                })}
              </Grid>
              {total > 9 && (
                <PaginationPage
                  numberOfPage={Math.ceil(total / 9)}
                  onChange={handlePage}
                />
              )}
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
