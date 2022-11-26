import Label from '@/components/Label';
import { CryptoOrder } from '@/models/crypto_order';
import { sliceString } from '@/utility/sliceString';
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
import DeleteAccount from './Action/DeleteAccount';
import EditAccount from './Action/EditAccount';
interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: CryptoOrder[];

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

  handleSearch,
  handleStatus,
  changeLimit,
  handleOrder
}) => {
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>('');

  const [limit, setLimit] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    handleStatus(value);
    handleOrder(null);
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
              <TableCell>Tên danh mục</TableCell>
              <TableCell>Số sản phẩm</TableCell>
              <TableCell align="right">Thời gian tạo</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ position: 'relative' }}>
            {cryptoOrders.map((cryptoOrder) => {
              return (
                <TableRow hover key={cryptoOrder._id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.name}
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
                      {cryptoOrder.total_product}
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
                      {/* {format(new Date(cryptoOrder.createdAt), 'dd/MM/yyyy')} */}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {/* {format(new Date(cryptoOrder.createdAt), ' HH:mm:ss')} */}
                    </Typography>
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
          count={cryptoOrders.length}
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
