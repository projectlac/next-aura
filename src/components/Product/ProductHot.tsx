import { Box, Container, Grid } from '@mui/material';
import { getProductHotUp } from 'api/product/productApi';
import { IProduct } from 'model/product';
import { useEffect, useState } from 'react';
import ProductItem from './ProductItem';

function ProductHot() {
  const [product, setProduct] = useState<IProduct[]>([]);
  useEffect(() => {
    getProductHotUp(4, 0).then((res) => {
      setProduct(res.data.data);
    });
  }, []);
  return (
    <Container>
      <Box
        sx={{
          padding: '108px 0 77px'
        }}
      >
        <Grid container columnSpacing={10}>
          {product.map((d, i) => (
            <Grid key={i} item md={3}>
              <ProductItem data={d} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default ProductHot;
