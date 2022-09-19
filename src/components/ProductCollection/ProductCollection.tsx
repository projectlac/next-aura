import { Grid } from '@mui/material';
import React from 'react';
import ProductCollectionItem from './ProductCollectionItem';
import bg from '@/assets/images/genshin-impact.webp';
function ProductCollection() {
  return (
    <Grid container columnSpacing={2} rowSpacing={2}>
      <Grid item md={3} xs={12}>
        <ProductCollectionItem title="Acc Vip" url="/account/vip" image={bg} />
      </Grid>
      <Grid item md={3} xs={12}>
        <ProductCollectionItem
          title="Acc Reroll"
          url="/account/reroll"
          image={bg}
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <ProductCollectionItem
          title="Acc Random"
          url="/account/random"
          image={bg}
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <ProductCollectionItem title="Acc Vip" url="" image={bg} />
      </Grid>
    </Grid>
  );
}

export default ProductCollection;
