import { useAuth } from '@/contexts/AuthGuard';
import { Card } from '@mui/material';
import { getHero, getWeapon } from 'api/apiTag/tagApi';
import { ITag } from 'model/tag';
import { useEffect, useState } from 'react';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrdersTag() {
  const [data, setData] = useState<ITag>(null);
  const { update } = useAuth();
  useEffect(() => {
    const callApi = async () => {
      let hero: ITag = null;
      let weapon: ITag = null;
      await getHero(999).then((res) => {
        const temp = res.data.data.map((d) => ({ ...d, type: 'hero' }));
        hero = { data: temp, total: res.data.total };
      });
      await getWeapon(999).then((res) => {
        const temp = res.data.data.map((d) => ({ ...d, type: 'weapon' }));
        weapon = { data: temp, total: res.data.total };
      });

      let data = [].concat(hero.data, weapon.data);

      let total = hero.total + weapon.total;

      setData({ data, total });
    };
    callApi();
  }, [update]);
  return (
    <Card sx={{ mb: 5 }}>
      <RecentOrdersTable cryptoOrders={data?.data} />
    </Card>
  );
}

export default RecentOrdersTag;
