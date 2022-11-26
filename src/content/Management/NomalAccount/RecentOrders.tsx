import { useAuth } from '@/contexts/AuthGuard';
import { Card } from '@mui/material';
import { getProduct } from 'api/product/productApi';
import { IProduct } from 'model/product';

import { useEffect, useState } from 'react';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const { update } = useAuth();

  const [data, setData] = useState<IProduct[]>([]);
  // const [page, setPage] = useState<number>(0);
  // const [limit, setLimit] = useState<number>(9999);

  useEffect(() => {
    getProduct(9999, 0).then((res) => {
      setData(res.data.data);
    });
  }, [update]);

  return (
    <Card sx={{ mb: 5 }}>
      <RecentOrdersTable cryptoOrders={data} />
    </Card>
  );
}

export default RecentOrders;
