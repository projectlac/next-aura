import { useAuth } from '@/contexts/AuthGuard';
import { Grid, Typography } from '@mui/material';

import AddAccount from './Action/AddAccount';

function PageHeader() {
  const { user: userData } = useAuth();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Danh sách sản phẩm
        </Typography>
        <Typography variant="subtitle2">
          Chào {userData?.username}, nơi đây quản lý sản phẩm
        </Typography>
      </Grid>
      <Grid item>
        <AddAccount title="Thêm sản phẩm" />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
