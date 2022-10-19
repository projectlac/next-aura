import bg from '@/assets/images/da-ban.png';
import formatMoney from '@/utility/formatMoney';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import { ITag } from 'model/item';
import Link from 'next/link';
interface IProps {
  title: string;
  url: string;
  imageUrl: string;
  price: string;
  code: string;
  des: string;
  isSold: boolean;
  server?: any;
  ar_level?: string;
  heroes?: ITag[];
  weapons?: ITag[];
}
function Items({
  title,
  url,
  imageUrl,
  price,
  code,
  isSold,
  server,
  ar_level,
  heroes,
  weapons
}: IProps) {
  return (
    <Card
      sx={{
        // background: '#fff',
        width: '100%',
        // background: `url(${bg})`,
        backgroundSize: 'cover',
        boxShadow: 'none',
        filter: isSold
          ? 'grayscale(1) drop-shadow(2px 4px 6px black)'
          : 'drop-shadow(2px 4px 6px black)',
        padding: '15px',
        borderRadius: '5px',
        transition: 'all 0.5s',
        '&:hover': {
          transform: isSold ? 'none' : 'scale(1.05)',
          '& .eff:before': {
            WebkitAnimation: 'shine .75s',
            animation: 'shine .75s'
          }
        },
        position: 'relative',
        background:
          'linear-gradient(90deg, rgba(228,214,200,1) 0%, rgba(239,231,225,1) 50%, rgba(228,214,200,1) 100%)'
      }}
    >
      {isSold && (
        <Box
          sx={{
            background: `url(${bg})`,
            width: 100,
            height: 100,
            position: 'absolute',
            zIndex: 1,
            backgroundSize: 'contain',
            top: '9px',
            left: '10px',
            filter: 'drop-shadow(2px 4px 6px black)'
          }}
        ></Box>
      )}
      <Link href={url}>
        <Box
          className={`${isSold ? 'disable-link' : ''} eff`}
          sx={{
            height: '175px',
            background: `url(${imageUrl})`,
            width: '100%',
            backgroundSize: '100% 100%',
            borderRadius: '5px',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
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
      </Link>
      <Box
        mt={1}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1',
          justifyContent: 'space-between',
          height: 'calc(100% - 175px - 7px)'
        }}
      >
        <Link href={url}>
          <Typography
            textAlign={'center'}
            fontWeight={'900'}
            fontFamily="Roboto"
            fontSize={15}
            minHeight="45px"
            color={'#333'}
            textTransform="capitalize"
            className={`${isSold ? 'disable-link' : ''}`}
            sx={{
              cursor: 'pointer'
            }}
          >
            {title}
          </Typography>
        </Link>{' '}
        {heroes && heroes.length > 0 && (
          <>
            <Divider sx={{ my: 1 }} />
            <Typography
              textAlign={'center'}
              sx={{
                fontWeight: '600',
                mb: 1,
                color: '#333'
              }}
            >
              Nhân vật: {heroes.length}
            </Typography>
          </>
        )}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          {heroes &&
            heroes.length > 0 &&
            heroes.map((d, i) => (
              <Box
                key={i}
                sx={{
                  width: '30px',
                  height: '30px',
                  background: `url(${d.image})`,
                  backgroundSize: '100%',
                  margin: '2px'
                }}
              ></Box>
            ))}
        </Box>
        {weapons && weapons.length > 0 && (
          <>
            <Divider sx={{ my: 1 }} />
            <Typography
              textAlign={'center'}
              sx={{
                fontWeight: '600',
                mb: 1,
                color: '#333'
              }}
            >
              Vũ khí: {weapons.length}
            </Typography>
          </>
        )}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          {weapons &&
            weapons.length > 0 &&
            weapons.map((d, i) => (
              <Box
                key={i}
                sx={{
                  width: '30px',
                  height: '30px',
                  background: `url(${d.image})`,
                  backgroundSize: '100%',
                  margin: '2px'
                }}
              ></Box>
            ))}
        </Box>
        <Divider sx={{ my: 1, mt: 'auto' }} />
        <Grid container columnSpacing={1.5}>
          <Grid item xs={6}>
            <Typography fontSize={15} fontWeight="600">
              AR <br />{' '}
              <span
                style={{ fontSize: '17px', fontWeight: 'bold', color: '#d33' }}
              >
                {ar_level}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography fontSize={15} fontWeight="600" textAlign="right">
              Server <br />
              <span
                style={{
                  fontSize: '17px',
                  fontWeight: 'bold',
                  color: '#d33',
                  textTransform: 'capitalize'
                }}
              >
                {server?.slug}
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 1 }} />
        <Grid container columnSpacing={1.5}>
          <Grid item xs={6}>
            <Typography fontSize={15} fontWeight="600">
              Mã account <br />{' '}
              <span
                style={{ fontSize: '17px', fontWeight: 'bold', color: '#d33' }}
              >
                {code}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography fontSize={15} fontWeight="600" textAlign="right">
              Giá bán <br />
              <span
                style={{ fontSize: '17px', fontWeight: 'bold', color: '#d33' }}
              >
                {formatMoney(price)}
              </span>
            </Typography>
          </Grid>
        </Grid>
        {/* <Divider sx={{ mt: 1, mb: 1.5 }} /> */}
        {/* <Box textAlign={'center'}>{des}</Box> */}
      </Box>
    </Card>
  );
}

export default Items;
