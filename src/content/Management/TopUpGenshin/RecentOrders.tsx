import { Card } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  // const [data, setData] = useState<IUser[]>([]);
  // const { update } = useAuth();
  const data = [];
  // useEffect(() => {
  //   const callApi = async () => {
  //     await getListUser(999).then((res) => {
  //       setData(res.data.data);
  //     });
  //   };
  //   callApi();
  // }, [update]);

  return (
    <Card sx={{ mb: 5 }}>
      <RecentOrdersTable cryptoOrders={data} />
    </Card>
  );
}

export default RecentOrders;
