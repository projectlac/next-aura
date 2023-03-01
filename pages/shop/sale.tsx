import { Container, Grid, Typography } from '@mui/material';

import ProductItem from '@/components/Product/ProductItem';
import Filter from '@/components/Shop/Filter';
import BaseLayout from '@/layouts/BaseLayout';
import { getCategory } from 'api/category/categoryApi';
import { getProductSale } from 'api/product/productApi';
import { IProduct } from 'model/product';
import { ReactElement, useEffect, useState } from 'react';

export default function Index() {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState<IProduct[]>([]);

  useEffect(() => {
    getCategory().then((res) => {
      setCategory(res.data);
    });
    getProductSale(12, 0).then((res) => {
      setProduct(res.data.data);
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
      <Grid container columnSpacing={7}>
        <Grid item md={2.5}>
          <Filter category={category} />
        </Grid>
        <Grid item md={9.5}>
          <Grid container columnSpacing={4} rowSpacing={5}>
            {product.map((d, i) => (
              <Grid key={i} item md={3}>
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
