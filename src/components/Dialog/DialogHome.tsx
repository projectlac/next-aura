import { Grid, Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import image from '@/assets/images/ChaiAppleCupcake_1024x1024.webp';

const emails = ['username@gmail.com', 'user02@gmail.com'];
import CloseIcon from '@mui/icons-material/Close';
export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  children: any;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

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
            <img src={image} alt="" />
          </Grid>
          <Grid item md={5}>
            <Typography
              sx={{
                paddingTop: '15px',
                fontSize: '2rem',
                lineHeight: '1.25'
              }}
            >
              HOLIDAY E-GIFT CARD
            </Typography>
            <Typography>$ 25.00 USD</Typography>
            <div>Detail</div>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

export default function DialogHome({ children }) {
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
      >
        {{ children }}
      </SimpleDialog>
    </div>
  );
}
