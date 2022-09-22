import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import { ISnackBar } from 'model/snackbar';
import * as React from 'react';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface IPropSnackBar {
  message: ISnackBar;
}
export default function CustomizedSnackbars({
  message: messageApp
}: IPropSnackBar) {
  const [message, setMessage] = React.useState<ISnackBar>(null);
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (messageApp) {
      setMessage(messageApp);
      setOpen(true);
    }
  }, [messageApp]);

  React.useEffect(() => {
    if (open) {
      let timer = setTimeout(() => setOpen(false), 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [open]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      console.log(event.type);
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        key={'top right'}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={message?.type}
          sx={{ width: '100%' }}
        >
          {message && message.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
