import FilterAccount from '@/components/Common/Filter/FilterAccount';
import PaginationPage from '@/components/Common/PaginationPage';
import TitleSpecial from '@/components/Common/TitleSpecial';
import FilterRandom from '@/components/Shop/Filters/FilterRandom';
import Items from '@/components/Shop/Items/Items';
import BaseLayout from '@/layouts/BaseLayout';
import { Box, Container, Grid } from '@mui/material';
import { queryRandomAccount } from 'api/apiAccount/account';
import { IAccountShop } from 'model/account';
import Head from 'next/head';
import { ReactElement, useEffect, useState } from 'react';

function AccountRandom() {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<IAccountShop[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<string>('');
  const [sort, setSort] = useState<boolean>(false);
  const [ar, setAr] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const handleData = (
    currency: string,
    isTrueSet: boolean,
    ar: string,
    code: string
  ) => {
    setPriceRange(currency);
    setSort(isTrueSet);
    setAr(ar);
    setCode(code);
    setPage(0);
  };

  const toggleOpen = () => {
    setOpen(!open);
  };
  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event.type);
    setPage((value - 1) * 9);
  };
  useEffect(() => {
    executeScroll();
    queryRandomAccount({
      limit: 9,
      offset: page,
      ar: ar,
      keyword: code,
      rangeMoney: priceRange,
      priceSort: sort
    }).then((res) => {
      setData(res.data.data);
      setTotal(res.data.total);
    });
  }, [page, sort, ar, code]);

  const executeScroll = () => {
    const id = 'scrollTo';
    const yOffset = -95;
    const element = document.getElementById(id);
    const y =
      element?.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <Box>
      <Head>
        <title>Account Random Mới Nhất</title>
      </Head>

      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <TitleSpecial>Account Random</TitleSpecial>
        <Box py={3}>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} md={3}>
              <FilterAccount open={open} toggleOpen={toggleOpen}>
                <FilterRandom handleData={handleData} />
              </FilterAccount>
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container columnSpacing={1.5} rowSpacing={2} id="scrollTo">
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

export default AccountRandom;
AccountRandom.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
