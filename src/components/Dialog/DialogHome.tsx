import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { IProduct } from 'model/product';
import * as React from 'react';

const emails = ['username@gmail.com', 'user02@gmail.com'];
export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  children: any;
  data: IProduct;
  age: string;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, data, age } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={'md'}>
      <Box
        sx={{
          padding: '25px'
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <CloseIcon onClick={handleClose} />
        </Box>
        <Grid container>
          <Grid item md={7}>
            <img src={data?.images[0]?.url} alt="" />
          </Grid>
          <Grid item md={5}>
            <Typography
              sx={{
                paddingTop: '15px',
                fontSize: '2rem',
                lineHeight: '1.25'
              }}
            >
              {data.name}
            </Typography>
            <Typography>
              {' '}
              {data.detail.filter((d) => d.size === age)[0].price} VNĐ
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

export default function DialogHome({ children, data, age }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button
        variant="outlined"
        sx={{
          background: '#fff',
          borderRadius: 0,
          color: '#333',
          borderColor: '#333',
          '&:hover': {
            background: '#fff',
            borderRadius: 0,
            color: '#333',
            borderColor: '#333'
          }
        }}
        onClick={handleClickOpen}
      >
        Thông tin
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        data={data}
        age={age}
      >
        {{ children }}
      </SimpleDialog>
    </div>
  );
}
