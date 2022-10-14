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
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useState } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Label from '@/components/Label';
import { IAccountVipAdmin } from 'model/account';
import DeleteAccount from './Action/DeleteAccount';
import EditAccount from './Action/EditAccount';
import { sliceString } from '@/utility/sliceString';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: IAccountVipAdmin[];
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

const applyFilters = (
  cryptoOrders: IAccountVipAdmin[],
  filters: Filters
): IAccountVipAdmin[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.is_sold.toString() !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: IAccountVipAdmin[],
  page: number,
  limit: number
): IAccountVipAdmin[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ cryptoOrders }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>('');
  const [buyTimeSort, setBuyTimeSort] = useState<boolean | null>(null);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });
  const clickSort = () => {
    switch (buyTimeSort) {
      case true:
        setBuyTimeSort(false);
        break;
      case false:
        setBuyTimeSort(null);
        break;
      default:
        setBuyTimeSort(true);
        break;
    }
  };
  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'true',
      name: 'Đã bán'
    },
    {
      id: 'false',
      name: 'Chưa bán'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filterBySearch = (cryptoOrders: IAccountVipAdmin[]) => {
    let filter = cryptoOrders.filter(
      (d) =>
        d.username.toLowerCase().includes(search.toLowerCase()) ||
        d.code.includes(search)
    );

    switch (buyTimeSort) {
      case true:
        filter = filter.sort(
          (a, b) => Date.parse(a.updated_at) - Date.parse(b.updated_at)
        );
        break;
      case false:
        filter = filter.sort(
          (a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at)
        );
        break;
      default:
        break;
    }

    return filter;
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  const filteredCode = filterBySearch(filteredCryptoOrders);
  const paginatedCryptoOrders = applyPagination(filteredCode, page, limit);

  const theme = useTheme();
  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
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
          label="Search by code"
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
                {statusOptions.map((statusOption) => (
                  <MenuItem key={statusOption.id} value={statusOption.id}>
                    {statusOption.name}
                  </MenuItem>
                ))}
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
              <TableCell>Loại ACC</TableCell>
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
          <TableBody>
            {paginatedCryptoOrders.map((cryptoOrder) => {
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
                      {cryptoOrder.type}
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
                    {!cryptoOrder.is_sold && (
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
                    )}
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
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
          count={filteredCryptoOrders.length}
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
