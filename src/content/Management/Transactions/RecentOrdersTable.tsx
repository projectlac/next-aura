import Label from '@/components/Label';
import { sliceString } from '@/utility/sliceString';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { format } from 'date-fns';
import { IAccountVipAdmin } from 'model/account';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useState } from 'react';
import DeleteAccount from './Action/DeleteAccount';
import EditAccount from './Action/EditAccount';
interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: IAccountVipAdmin[];
  total: number;
  changePage: (page: number) => void;
  changeLimit: (limit: number) => void;
  handleSearch: (keyword: string) => void;
  handleStatus: (status: boolean | null) => void;
  handleOrder: (status: 'true' | 'false' | null) => void;
}

interface Filters {
  status?: 'true' | 'false';
}

const getStatusLabel = (cryptoOrderStatus: boolean): JSX.Element => {
  const map = {
    false: {
      text: 'Chưa bán',
      color: 'error'
    },
    true: {
      text: 'Đã bán',
      color: 'success'
    }
  };

  const { text, color }: any = map[cryptoOrderStatus.toString()];

  return <Label color={color}>{text}</Label>;
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({
  cryptoOrders,
  changePage,
  total,
  handleSearch,
  handleStatus,
  changeLimit,
  handleOrder
}) => {
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [buyTimeSort, setBuyTimeSort] = useState<boolean | null>(null);
  const [limit, setLimit] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const clickSort = () => {
    switch (buyTimeSort) {
      case true:
        setBuyTimeSort(false);
        handleOrder('false');
        break;
      case false:
        setBuyTimeSort(null);
        handleOrder(null);
        break;
      default:
        setBuyTimeSort(true);
        handleOrder('true');
        break;
    }
  };
  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    handleStatus(value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
    changePage(newPage * limit);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
    changeLimit(parseInt(event.target.value));
  };

  const theme = useTheme();

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <Card>
      <Box
        sx={{
          padding: '10px 15px 0px'
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          label="Search bằng code hoặc username"
          value={search}
          onChange={handleChangeSearch}
        ></TextField>
      </Box>
      <CardHeader
        action={
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status || 'all'}
                onChange={handleStatusChange}
                label="Status"
                autoWidth
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="true">Đã bán</MenuItem>
                <MenuItem value="false">Chưa bán</MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
        title="Recent Orders"
      />

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account ID</TableCell>
              <TableCell>Info</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Người đăng</TableCell>
              <TableCell align="right">Thời gian tạo</TableCell>
              <TableCell
                align="right"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row'
                }}
                onClick={clickSort}
              >
                Thời gian bán{' '}
                {filters.status === 'true' && (
                  <ArrowDownwardIcon
                    sx={{
                      transition: 'all 0.2s',
                      transform: `${
                        buyTimeSort === true
                          ? 'rotate(180deg)'
                          : buyTimeSort === null
                          ? 'rotate(-90deg)'
                          : 'rotate(0deg)'
                      }`
                    }}
                  />
                )}
              </TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ position: 'relative' }}>
            {cryptoOrders.map((cryptoOrder) => {
              return (
                <TableRow hover key={cryptoOrder.id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.code}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {cryptoOrder.password}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {sliceString(cryptoOrder.name)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      Giá: {numeral(cryptoOrder.price).format(`0,0`)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.user.username}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {format(new Date(cryptoOrder.created_at), 'dd/MM/yyyy')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(new Date(cryptoOrder.created_at), ' HH:mm:ss')}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {cryptoOrder.is_sold && (
                      <>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {format(
                            new Date(cryptoOrder?.updated_at),
                            'dd/MM/yyyy'
                          )}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {format(
                            new Date(cryptoOrder?.updated_at),
                            ' HH:mm:ss'
                          )}
                        </Typography>
                      </>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(cryptoOrder.is_sold)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditAccount
                          title="Sửa tài khoản"
                          slug={cryptoOrder.slug}
                        />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.error.lighter
                          },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteAccount
                          title="Xóa tài khoản"
                          slug={cryptoOrder.slug}
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={total}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  cryptoOrders: []
};

export default RecentOrdersTable;
