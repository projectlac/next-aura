import {
  Box,
  Card,
  CardHeader,
  Divider,
  IconButton,
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
import { IBanner, IProduct } from 'model/product';
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useState } from 'react';
import DeleteAccount from './Action/DeleteAccount';
import EditAccount from './Action/EditAccount';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: IBanner[];
}

const applyPagination = (
  cryptoOrders: IBanner[],
  page: number,
  limit: number
): IBanner[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ cryptoOrders }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedCryptoOrders = applyPagination(cryptoOrders, page, limit);

  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Recent Orders" />

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Ảnh</TableCell>

              <TableCell align="right">Thời gian tạo</TableCell>

              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((cryptoOrder) => {
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
                      {cryptoOrder.value[0]}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box
                      width={200}
                      height={150}
                      sx={{
                        background: `url(${cryptoOrder.images[0]})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat'
                      }}
                    ></Box>
                  </TableCell>

                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {format(new Date(cryptoOrder.createdAt), 'dd/MM/yyyy')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(new Date(cryptoOrder.createdAt), ' HH:mm:ss')}
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
                          slug={cryptoOrder._id}
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
