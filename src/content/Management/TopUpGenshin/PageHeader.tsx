import { useAuth } from '@/contexts/AuthGuard';
import { Grid, Typography } from '@mui/material';

function PageHeader() {
  const { user: userData } = useAuth();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Quản lý nạp game Genshin
        </Typography>
        <Typography variant="subtitle2">
          Hú {userData?.username}, quản lý yêu cầu nạp ở đây nhé~!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
