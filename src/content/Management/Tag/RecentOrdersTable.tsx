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
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useState } from 'react';

import Label from '@/components/Label';
import { IData, IType } from 'model/tag';
import Delete from './Action/Delete';
import EditTag from './Action/EditTag';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: IData[];
}

interface Filters {
  type: 'hero' | 'weapon';
}

const applyPagination = (
  cryptoOrders: IData[],
  page: number,
  limit: number
): IData[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ cryptoOrders }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    type: null
  });
  const [search, setSearch] = useState<string>('');
  const getStatusLabel = (type: IType): JSX.Element => {
    const map = {
      hero: {
        text: 'Nhân vật',
        color: 'error'
      },
      weapon: {
        text: 'Vũ khí',
        color: 'success'
      }
    };

    const { text, color }: any = map[type];

    return <Label color={color}>{text}</Label>;
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      type: value
    }));
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const applyFilters = (cryptoOrders: IData[], filters: Filters): IData[] => {
    return cryptoOrders.filter((cryptoOrder) => {
      let matches = true;

      if (filters.type && cryptoOrder.type !== filters.type) {
        matches = false;
      }

      return matches;
    });
  };
  const filterBySearch = (cryptoOrders: IData[]) => {
    return cryptoOrders.filter((d) =>
      d.desc.toLowerCase().includes(search.toLowerCase())
    );
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
          label="Search bằng tên"
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
                value={filters.type || 'all'}
                onChange={handleStatusChange}
                label="Status"
                autoWidth
              >
                <MenuItem value={'all'}>All</MenuItem>
                <MenuItem value={'hero'}>Hero</MenuItem>
                <MenuItem value={'weapon'}>Weapon</MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
        title="Danh sách"
      />

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Loại</TableCell>

              <TableCell align="right">Thời gian tạo</TableCell>
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
                      {cryptoOrder.desc}
                    </Typography>
                  </TableCell>

                  <TableCell>{getStatusLabel(cryptoOrder.type)}</TableCell>

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
                        {/* <EditTwoToneIcon fontSize="small" /> */}
                        <EditTag
                          title="Sửa tag"
                          slug={cryptoOrder.slug}
                          type={cryptoOrder.type}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <Delete
                          title="Xóa tag"
                          slug={cryptoOrder.slug}
                          type={cryptoOrder.type}
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
