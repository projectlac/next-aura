import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import {
  alpha,
  Badge,
  Box,
  Divider,
  IconButton,
  Popover,
  Tooltip,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';

import InfiniteNotification from './InfiniteNotification';

const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
      
      .MuiBadge-badge {
          background-color: ${alpha(theme.palette.error.main, 0.1)};
          color: ${theme.palette.error.main};
          min-width: 16px; 
          height: 16px;
          padding: 0;
          &::after {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
              content: "";
          }
      }
  `
);

function HeaderNotifications() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const indexNewsestID = localStorage.getItem('indexNewsestID');
    Boolean(indexNewsestID) ? setCount(+indexNewsestID) : setCount(0);
  }, []);
  return (
    <>
      <Tooltip arrow title="Notifications">
        <IconButton color="primary" ref={ref} onClick={handleOpen}>
          <NotificationsBadge
            badgeContent={count}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <NotificationsActiveTwoToneIcon />
          </NotificationsBadge>
        </IconButton>
      </Tooltip>

      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Box>
          <Box
            sx={{ p: 2 }}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            position={'sticky'}
          >
            <Typography variant="h5">Thông báo</Typography>
          </Box>
          <Divider />
          <InfiniteNotification isOpen={isOpen} />
        </Box>
      </Popover>
    </>
  );
}

export default HeaderNotifications;
