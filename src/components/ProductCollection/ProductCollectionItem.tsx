import eff from '@/assets/images/effect/pngwing.png';
import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material';
import Link from 'next/link';
interface IAll {
  inStock: number;
  sold: number;
  total: string;
  type: string;
}
interface ICollectionItemProps {
  title: string;
  data: IAll;
  image: string;
  url?: string;
}
function ProductCollectionItem({
  data,
  title,
  url,
  image
}: ICollectionItemProps) {
  return (
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
      <Link href={url}>
        <Box
          className="eff"
          sx={{
            height: '175px',
            background: `url(${image})`,
            width: '100%',
            backgroundSize: 'cover',
            backgrouadPosition: 'center center',
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
          {title}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Grid container columnSpacing={1.5}>
          <Grid item md={6} xs={6}>
            <Typography fontSize={15} fontWeight="600">
              Số tài khoản <br />{' '}
              <span
                style={{ fontSize: '17px', fontWeight: 'bold', color: '#d33' }}
              >
                {data?.total || 0}
              </span>
            </Typography>
          </Grid>
          <Grid item md={6} xs={6}>
            <Typography fontSize={15} fontWeight="600" textAlign="right">
              Đã bán <br />
              <span
                style={{ fontSize: '17px', fontWeight: 'bold', color: '#d33' }}
              >
                {data?.sold || 0}
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 1, mb: 1.5 }} />
        <Box textAlign={'center'}>
          <Link href={url}>
            <Button variant="contained">Khám phá</Button>
          </Link>
        </Box>
      </Box>
    </Card>
  );
}

export default ProductCollectionItem;
