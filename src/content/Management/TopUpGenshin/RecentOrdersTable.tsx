import Label from '@/components/Label';
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
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { format } from 'date-fns';
import { IGetDeposit, IStatus } from 'model/deposit';
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useState } from 'react';
import EditTag from './Action/EditTag';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: IGetDeposit[];
}

interface Filters {
  role?: 'PENDING' | 'SUCCESS';
}

const getStatusLabel = (cryptoOrderStatus: IStatus): JSX.Element => {
  console.log(cryptoOrderStatus);

  const map = {
    PENDING: {
      text: 'PENDING',
      color: 'error'
    },
    SUCCESS: {
      text: 'SUCCESS',
      color: 'success'
    },
    ERROR: {
      text: 'ERROR',
      color: 'error'
    }
  };

  const { text, color }: any = map[cryptoOrderStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  cryptoOrders: IGetDeposit[],
  filters: Filters
): IGetDeposit[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    if (filters.role && cryptoOrder.status !== filters.role) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: IGetDeposit[],
  page: number,
  limit: number
): IGetDeposit[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ cryptoOrders }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    role: null
  });

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      role: value
    }));
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );

  const theme = useTheme();

  return (
    <Card>
      <CardHeader
        action={
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.role || 'all'}
                onChange={handleStatusChange}
                label="Status"
                autoWidth
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="PENDING">PENDING</MenuItem>
                <MenuItem value="SUCCESS">SUCCESS</MenuItem>
                <MenuItem value="ERROR">ERROR</MenuItem>
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
              <TableCell width={'30%'}>Gói nạp</TableCell>
              <TableCell>Thông tin</TableCell>
              <TableCell align="right">Ngày mua</TableCell>
              <TableCell align="right">Trạng thái</TableCell>
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
                      {cryptoOrder.pack}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      <b>Username: </b> {cryptoOrder.username} |{' '}
                      <b>Password: </b>
                      {cryptoOrder.password}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      <b>Social: </b> {cryptoOrder.phone} | <b>Ingame: </b>
                      {cryptoOrder.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      <b>Server: </b> {cryptoOrder.server} |{' '}
                      {cryptoOrder.note && (
                        <>
                          <b>Note</b>
                          {cryptoOrder.note}
                        </>
                      )}
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
                    <Typography>
                      {format(new Date(cryptoOrder.created_at), 'hh:mm:ss')}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(cryptoOrder.status)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Đổi trạng thái" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.success.lighter
                          },
                          color: theme.palette.success.main
                        }}
                        color="success"
                        size="small"
                      >
                        <EditTag title="Đổi trạng thái" id={cryptoOrder.id} />
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
