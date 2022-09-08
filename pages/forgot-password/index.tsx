import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  styled,
  TextField,
  Typography
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;

    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  const route = useRouter();
  return (
    <OverviewWrapper>
      <Head>
        <title>Genshin Shop</title>
      </Head>

      <Container maxWidth="md" sx={{ mt: 15 }}>
        <Box py={3}>
          <Grid container justifyContent="center">
            <Grid md={6} item>
              <Card>
                <Box p={10}>
                  <Typography
                    mb={3}
                    textAlign="center"
                    fontWeight="bold"
                    fontSize={19}
                    textTransform="uppercase"
                  >
                    Quên mật khẩu
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 3 }}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      route.push('/dashboards');
                    }}
                  >
                    Quên mật khẩu
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
