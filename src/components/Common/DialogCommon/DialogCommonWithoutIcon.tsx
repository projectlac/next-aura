import { Button, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IDialog {
  titleButton: string;
  title: string;
  children: React.ReactNode;
  handleCloseDialog: () => void;
  handleOpenDialog: () => void;
  openDialog: boolean;
}

export default function DialogCommonWithoutIcon({
  titleButton,
  title,
  children,
  handleCloseDialog,
  openDialog,
  handleOpenDialog
}: IDialog) {
  return (
    <div>
      <Button variant="contained" onClick={handleOpenDialog}>
        {titleButton}
      </Button>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '20px' }}
        >
          {title}
        </DialogTitle>

        <DialogContent>
          <Divider sx={{ mb: 1 }}></Divider>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
}
