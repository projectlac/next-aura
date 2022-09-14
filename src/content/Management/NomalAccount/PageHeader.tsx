import { Grid, Typography } from '@mui/material';

import AddAccount from './Action/AddAccount';

function PageHeader() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Danh sách tài khoản thường
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your recent transactions
        </Typography>
      </Grid>
      <Grid item>
        <AddAccount title="Thêm tài khoản" />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
