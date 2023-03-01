import { useAuth } from '@/contexts/AuthGuard';
import { Card } from '@mui/material';
import { getAll } from 'api/banner/banner';
import { IBanner } from 'model/product';

import { useEffect, useState } from 'react';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const { update } = useAuth();

  const [data, setData] = useState<IBanner[]>([]);
  // const [page, setPage] = useState<number>(0);
  // const [limit, setLimit] = useState<number>(9999);

  useEffect(() => {
    getAll().then((res) => {
      setData(res.data);
    });
  }, [update]);

  return (
    <Card sx={{ mb: 5 }}>
      <RecentOrdersTable cryptoOrders={data} />
    </Card>
  );
}

export default RecentOrders;
