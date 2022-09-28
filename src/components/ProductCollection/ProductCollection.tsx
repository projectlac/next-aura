import bgVip from '@/assets/images/mainCategory/Ink_alcohol_2.jpg';
import napgame from '@/assets/images/mainCategory/napgame.png';
import random from '@/assets/images/mainCategory/random.png';
import rrr from '@/assets/images/mainCategory/rerroll.png';
import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material';
import ProductCollectionItem from './ProductCollectionItem';

import eff from '@/assets/images/effect/pngwing.png';
import { getInfoAllAccount } from 'api/apiAccount/account';
import Link from 'next/link';
import { useEffect, useState } from 'react';
interface IAll {
  inStock: number;
  sold: number;
  total: string;
  type: string;
}
function ProductCollection() {
  const [dataAccVip, setDataAccVip] = useState<IAll>();
  const [dataAccRandom, setDataAccRandom] = useState<IAll>();
  const [dataAccReroll, setDataAccReroll] = useState<IAll>();

  useEffect(() => {
    getInfoAllAccount().then((res) => {
      res.data.map((d) => {
        if (d.type === 'VIP') setDataAccVip(d);
        if (d.type === 'REROLL') setDataAccReroll(d);
        if (d.type === 'RANDOM') setDataAccRandom(d);
      });
    });
  }, []);
  return (
    <Grid container columnSpacing={2} rowSpacing={2}>
      <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          title="Acc Vip"
          url="/account/vip"
          image={bgVip}
          data={dataAccVip}
        />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          title="Acc Reroll"
          url="/account/reroll"
          image={rrr}
          data={dataAccRandom}
        />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          title="Acc Random"
          url="/account/random"
          image={random}
          data={dataAccReroll}
        />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
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
                background: `url(${napgame})`,
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
                  Yêu cầu <br />{' '}
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
