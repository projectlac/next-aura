import { useAuth } from '@/contexts/AuthGuard';
import { Grid, Typography } from '@mui/material';

function PageHeader() {
  const { user: userData } = useAuth();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Thay đổi baner
        </Typography>
        <Typography variant="subtitle2">
          Chào {userData?.username}, nơi đây thay đổi banner
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
