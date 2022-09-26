import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import ProductCollectionItem from './ProductCollectionItem';
import bg from '@/assets/images/genshin-impact.webp';
import bgVip from '@/assets/images/mainCategory/Ink_alcohol_2.jpg';
import Link from 'next/link';
import eff from '@/assets/images/effect/pngwing.png';
function ProductCollection() {
  return (
    <Grid container columnSpacing={2} rowSpacing={2}>
      <Grid item md={3} xs={12}>
        <ProductCollectionItem
          title="Acc Vip"
          url="/account/vip"
          image={bgVip}
        />
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
        <Card
          sx={{
            background: '#fff',
            padding: '15px',
            borderRadius: '5px',
            transition: 'all 0.5s',
            '&:hover': {
              transform: 'scale(1.05)',

              '& .eff:before': {
                transform: 'translateX(375px)'
              }
            }
          }}
        >
          <Link href={'topup-genshin'}>
            <Box
              className="eff"
              sx={{
                height: '175px',
                background: `url(${bg})`,
                width: '100%',
                backgroundSize: 'cover',
                borderRadius: '5px',
                position: 'relative',
                overflow: 'hidden',
                '&:before': {
                  width: '388px',
                  height: '300px',
                  bottom: 0,
                  position: 'absolute',
                  content: '""',
                  background: `url(${eff})`,
                  backgroundSize: 'cover',
                  transform: 'translateX(-375px)',
                  transition: 'all 1.2s'
                }
              }}
            ></Box>
          </Link>

          <Box mt={1}>
            <Typography
              textAlign={'center'}
              fontWeight={'900'}
              fontFamily="Roboto"
              fontSize={25}
              color={'primary'}
              textTransform="uppercase"
            >
              Nạp Game
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Grid container columnSpacing={1.5}>
              <Grid item md={6} xs={6}>
                <Typography fontSize={15} fontWeight="600">
                  Đã nạp <br />{' '}
                  <span
                    style={{
                      fontSize: '17px',
                      fontWeight: 'bold',
                      color: '#d33'
                    }}
                  >
                    123
                  </span>
                </Typography>
              </Grid>
              <Grid item md={6} xs={6}>
                <Typography fontSize={15} fontWeight="600" textAlign="right">
                  Thành công <br />
                  <span
                    style={{
                      fontSize: '17px',
                      fontWeight: 'bold',
                      color: '#d33'
                    }}
                  >
                    123
                  </span>
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ mt: 1, mb: 1.5 }} />
            <Box textAlign={'center'}>
              <Link href={'topup-genshin'}>
                <Button variant="contained">Khám phá</Button>
              </Link>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ProductCollection;
