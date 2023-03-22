import { Box, Container, Grid, Typography } from '@mui/material';
import { getProductHotUp } from 'api/product/productApi';
import { IProduct } from 'model/product';
import { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import Slider from 'react-slick';
function ProductHot() {
  const [product, setProduct] = useState<IProduct[]>([]);
  useEffect(() => {
    getProductHotUp(4, 0).then((res) => {
      setProduct(res.data.data);
    });
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    dot: false,
    arrows: true
  };

  return (
    <Container>
      <Box
        sx={{
          padding: { md: '108px 0 77px', xs: '47px 0' }
        }}
      >
        <Typography textAlign={'center'}>SẢN PHẨM HOT</Typography>
        <Grid
          container
          columnSpacing={10}
          sx={{ display: { md: 'flex', xs: 'none' } }}
        >
          {product.map((d, i) => (
            <Grid key={i} item md={3}>
              <ProductItem data={d} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: { md: 'none ', xs: 'block' } }}>
          <Slider {...settings} className="home-slider">
            {product.map((d, i) => (
              <Box
                key={i}
                sx={{
                  padding: '0px 7px'
                }}
              >
                <ProductItem data={d} />
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    </Container>
  );
}

export default ProductHot;
