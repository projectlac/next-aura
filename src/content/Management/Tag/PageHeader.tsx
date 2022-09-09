import { Grid, Typography } from '@mui/material';

import AddTag from './Action/AddTag';

function PageHeader() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Danh sách Tag
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your recent transactions
        </Typography>
      </Grid>
      <Grid item>
        <AddTag title="Tạo tag" />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
