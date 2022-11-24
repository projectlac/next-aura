import { useAuth } from '@/contexts/AuthGuard';
import { Card } from '@mui/material';

import { getCategory } from 'api/category/categoryApi';

import { useEffect, useState } from 'react';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const { update } = useAuth();
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const [status, setStatus] = useState<boolean | null>(null);
  const [soldOrder, setSoldOrder] = useState<'true' | 'false' | null>(null);

  const [search, setSearch] = useState<string>('');

  const changePage = (page: number) => {
    setPage(page);
  };
  const changeLimit = (limit: number) => {
    setLimit(limit);
  };
  const handleSearch = (keyword: string) => {
    setSearch(keyword);
    setPage(0);
  };
  const handleOrder = (order: 'true' | 'false' | null) => {
    setSearch('');
    setSoldOrder(order);
  };
  const handleStatus = (status: boolean | null) => {
    setStatus(status);
    setPage(0);
    setSearch('');
  };
  useEffect(() => {
    setData([]);
    getCategory().then((res) => {
      setData(res.data);
    });
  }, [update, page, search, status, limit, soldOrder]);
  return (
    <Card sx={{ mb: 5 }}>
      <RecentOrdersTable
        cryptoOrders={data}
        changePage={changePage}
        handleSearch={handleSearch}
        changeLimit={changeLimit}
        handleStatus={handleStatus}
        handleOrder={handleOrder}
      />
    </Card>
  );
}

export default RecentOrders;
