import FilterAccount from '@/components/Common/Filter/FilterAccount';
import OgTag from '@/components/Common/OgTag';
import PaginationPage from '@/components/Common/PaginationPage';
import TitleSpecial from '@/components/Common/TitleSpecial';
import FilterRandom from '@/components/Shop/Filters/FilterRandom';
import Items from '@/components/Shop/Items/Items';
import BaseLayout from '@/layouts/BaseLayout';
import { Box, Container, Grid } from '@mui/material';
import { queryRerollAccount } from 'api/apiAccount/account';
import { IAccountShop } from 'model/account';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
function AccountReroll() {
  const router = useRouter();
  const { page: pageHistory } = router.query;
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<IAccountShop[]>([]);
  const [total, setTotal] = useState<number>(0);

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
    router.push(`/account/reroll`);
  };

  const toggleOpen = () => {
    setOpen(!open);
  };
  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event.type);
    router.push(`/account/reroll?page=${value}`);
  };
  useEffect(() => {
    executeScroll();
    queryRerollAccount({
      limit: 9,
      offset: pageHistory ? (+pageHistory - 1) * 9 : 0,
      ar: ar,
      keyword: code,
      rangeMoney: priceRange,
      priceSort: sort
    }).then((res) => {
      setData(res.data.data);
      setTotal(res.data.total);
    });
  }, [pageHistory, sort, ar, code]);

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
        <title>Account Reroll Mới Nhất</title>
        <OgTag title="Account Reroll Mới Nhất" />
      </Head>

      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <TitleSpecial>Account Reroll</TitleSpecial>
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
                    <Grid item xs={12} md={4} sm={6} key={i}>
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
                  index={+pageHistory}
                />
              )}
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
