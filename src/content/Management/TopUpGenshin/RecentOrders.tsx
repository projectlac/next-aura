import { useAuth } from '@/contexts/AuthGuard';
import { Card } from '@mui/material';
import { getDeposit } from 'api/apiDeposit/account';
import { IGetDeposit } from 'model/deposit';
import { useEffect, useState } from 'react';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const [data, setData] = useState<IGetDeposit[]>([]);
  const { update } = useAuth();

  useEffect(() => {
    const callApi = async () => {
      await getDeposit().then((res) => {
        const data = res.data.data;
        let temp: IGetDeposit[] = [];
        data.map((d) => {
          temp.push({
            id: d.transaction.id,
            pack: d.pack_list.description,
            uuid: d.uuid,
            username: d.username,
            password: d.password,
            server: d.server,
            name: d.name,
            phone: d.phone,
            note: d.note,
            status: d.transaction.status,
            created_at: d.transaction.created_at
          });
        });
        setData(temp);
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
