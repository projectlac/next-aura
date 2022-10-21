import { useAuth } from '@/contexts/AuthGuard';
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
import { getNotification } from 'api/apiUser/userApi';
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
  const { update } = useAuth();
  const [isOpen, setOpen] = useState<boolean>(false);
  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let id = localStorage.getItem('numberOfFate');
    const callFirst = async () => {
      const links = await getNotification(20, 0);
      const issues = links.data.data;
      const getNewsetId = localStorage.getItem(`lastestNotify-${id}`);
      const indexNewsestID = issues.indexOf(
        issues.filter((d) => d.id === +getNewsetId)[0]
      );

      setCount(indexNewsestID < 0 ? 999 : indexNewsestID);
    };
    callFirst();
  }, [update]);
  useEffect(() => {
    let id = localStorage.getItem('numberOfFate');
    const indexNewsestID = localStorage.getItem(`indexNewsestID-${id}`);
    setCount(+indexNewsestID);
  }, [isOpen]);
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
            <NotificationsActiveTwoToneIcon
              sx={{
                WebkitAnimation: ' ring 4s .7s ease-in-out infinite',
                WebkitTransformOrigin: ' 50% 4px',
                MozAnimation: ' ring 4s .7s ease-in-out infinite',
                MozTransformOrigin: ' 50% 4px',
                animation: `${
                  count !== 0 && 'ring 4s .7s ease-in-out infinite'
                } `,
                transformOrigin: ' 50% 4px'
              }}
            />
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
