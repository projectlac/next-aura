import TopUp from '@/components/TopUp/TopUp';
import TopUpMobile from '@/components/TopUp/TopUpMobile';
import { ProtectGuess } from '@/contexts/ProtectGuess';
import BaseLayout from '@/layouts/BaseLayout';
import { Container, Hidden } from '@mui/material';

export default function VerticalTabs() {
  return (
    <ProtectGuess>
      <Container maxWidth="lg" sx={{ mt: 20, mb: 10 }}>
        <Hidden mdDown>
          <TopUp />
        </Hidden>
        <Hidden mdUp>
          <TopUpMobile />
        </Hidden>
      </Container>
    </ProtectGuess>
  );
}
VerticalTabs.getLayout = function getLayout(page: React.ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
