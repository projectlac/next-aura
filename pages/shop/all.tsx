import { Container, Grid, Typography } from '@mui/material';

import Filter from '@/components/Shop/Filter';
import ProductItem from '@/components/Product/ProductItem';
import BaseLayout from '@/layouts/BaseLayout';
import { ReactElement, useEffect, useState } from 'react';
import { getCategory } from 'api/category/categoryApi';
import { getProduct } from 'api/product/productApi';
import { IProduct } from 'model/product';

export default function Index() {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState<IProduct[]>([]);

  useEffect(() => {
    getCategory().then((res) => {
      setCategory(res.data);
    });
    getProduct(12, 0).then((res) => {
      setProduct(res.data.data);
    });
  }, []);

  return (
    <Container sx={{ mb: 5 }}>
      <Typography
        textAlign={'center'}
        sx={{
          margin: { md: '100px auto 80px', xs: '50px auto 36px' },
          fontSize: '20px'
        }}
      >
        TỔNG HỢP SẢN PHẨM
      </Typography>
      <Grid container columnSpacing={7}>
        <Grid item md={2.5} xs={12}>
          <Filter category={category} />
        </Grid>
        <Grid item md={9.5} xs={12}>
          <Grid container columnSpacing={4} rowSpacing={5}>
            {product.map((d, i) => (
              <Grid key={i} item md={3} xs={6}>
                <ProductItem data={d} />
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
