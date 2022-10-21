import { useAuth } from '@/contexts/AuthGuard';
import { Card } from '@mui/material';
import { getListUser } from 'api/apiUser/userApi';
import { IUser } from 'model/user';
import { useEffect, useState } from 'react';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const [data, setData] = useState<IUser[]>([]);
  const { update } = useAuth();

  useEffect(() => {
    const callApi = async () => {
      await getListUser(9999).then((res) => {
        setData(res.data.data);
      });
    };
    callApi();
  }, [update]);

  return (
    <Card sx={{ mb: 5 }}>
      <RecentOrdersTable cryptoOrders={data} />
    </Card>
  );
}

export default RecentOrders;
