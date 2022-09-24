import { useAuth } from '@/contexts/AuthGuard';
import { Card } from '@mui/material';
import { getAccountVipFromDashboard } from 'api/apiAccount/account';
import { IAccountVipAdmin } from 'model/account';
import { useEffect, useState } from 'react';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const { update } = useAuth();
  const [data, setData] = useState<IAccountVipAdmin[]>([]);

  useEffect(() => {
    getAccountVipFromDashboard({
      limit: 10,
      offset: 0,
      priceSort: false
    }).then((res) => setData(res.data.data));
  }, [update]);
  return (
    <Card sx={{ mb: 5 }}>
      <RecentOrdersTable cryptoOrders={data} />
    </Card>
  );
}

export default RecentOrders;
