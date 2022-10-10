import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import CountUp from 'react-countup';
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
  const router = useRouter();
  return (
    <Card
      sx={{
        background:
          'linear-gradient(90deg, rgba(228,214,200,1) 0%, rgba(239,231,225,1) 50%, rgba(228,214,200,1) 100%)',
        padding: '15px',
        borderRadius: '5px',
        transition: 'all 0.5s',
        '&:hover': {
          transform: 'scale(1.05)',

          '& .eff:before': {
            WebkitAnimation: 'shine .75s',
            animation: 'shine .75s'
          }
        }
      }}
    >
      <Box
        onClick={() => {
          localStorage.removeItem('filter');
          router.push(url);
        }}
        sx={{ cursor: 'pointer' }}
      >
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
              position: 'absolute',
              top: '0',
              left: '-75%',
              zIndex: '2',
              display: 'block',
              content: "''",
              width: '50%',
              height: '100%',
              background:
                'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,.3) 100%)',
              WebkitTransform: 'skewX(-25deg)',
              transform: 'skewX(-25deg)'
            }
          }}
        ></Box>
      </Box>

      <Box mt={1}>
        <Typography
          textAlign={'center'}
          fontWeight={'900'}
          fontFamily="Roboto"
          fontSize={25}
          color={'primary'}
          textTransform="uppercase"
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            localStorage.removeItem('filter');
            router.push(url);
          }}
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
                {data?.inStock ? (
                  <CountUp end={+data?.inStock} duration={1} />
                ) : (
                  0
                )}
              </span>
            </Typography>
          </Grid>
          <Grid item md={6} xs={6}>
            <Typography fontSize={15} fontWeight="600" textAlign="right">
              Đã bán <br />
              <span
                style={{ fontSize: '17px', fontWeight: 'bold', color: '#d33' }}
              >
                {data?.sold ? <CountUp end={+data?.sold} duration={1} /> : 0}
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 1, mb: 1.5 }} />
        <Box textAlign={'center'}>
          <Box
            onClick={() => {
              localStorage.removeItem('filter');
              router.push(url);
            }}
            sx={{ cursor: 'pointer' }}
          >
            <Button variant="contained" color="secondary">
              Khám phá
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default ProductCollectionItem;
