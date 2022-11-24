import { Container, Grid, Typography } from '@mui/material';

import Filter from '@/components/Shop/Filter';
import ProductItem from '@/components/Product/ProductItem';
import BaseLayout from '@/layouts/BaseLayout';
import { ReactElement, useEffect, useState } from 'react';
import { getCategory } from 'api/category/categoryApi';

export default function Index() {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    getCategory().then((res) => {
      setCategory(res.data);
    });
  }, []);

  return (
    <Container sx={{ mb: 5 }}>
      <Typography
        textAlign={'center'}
        sx={{
          margin: '100px auto 80px',
          fontSize: '20px'
        }}
      >
        SẢN PHẨM GIẢM GIÁ
      </Typography>
      <Grid container>
        <Grid item md={2.5}>
          <Filter category={category} />
        </Grid>
        <Grid item md={9.5}>
          <Grid container columnSpacing={4} rowSpacing={5}>
            {[...Array(12)].map((d, i) => (
              <Grid key={i} item md={3}>
                <ProductItem />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
Index.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
