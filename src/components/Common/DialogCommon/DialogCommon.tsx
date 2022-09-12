import { Box } from '@mui/material';
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
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  handleCloseDialog: () => void;
  handleOpenDialog: () => void;
  openDialog: boolean;
}

export default function DialogCommon({
  icon,
  title,
  children,
  handleCloseDialog,
  openDialog,
  handleOpenDialog
}: IDialog) {
  return (
    <div>
      <Box onClick={handleOpenDialog}>{icon}</Box>

      <Dialog
        fullWidth
        maxWidth="md"
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
}
