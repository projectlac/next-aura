import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, Hidden, styled } from '@mui/material';
import React from 'react';
const FilterBox = styled(Box)({
  width: '90px',
  background: '#fff',
  fontSize: '15px',
  fontWeight: '600',
  borderTopRightRadius: '15px',
  borderBottomRightRadius: '15px',
  position: 'fixed',
  right: '-86px',
  boxShadow: '4px 0px 3px 0px #00000087',
  zIndex: '9',
  padding: '3px',
  alignItems: 'center',
  display: 'flex',
  top: '20%'
});
const FilterCollection = styled(Box)({
  position: 'fixed',
  zIndex: '3',
  left: '0',
  top: '50%',
  transform: 'translateY(-50%) translateX(-95vw)',
  transition: 'all 0.3s',
  width: '95%',
  '&.active': {
    transform: 'translateY(-50%) translateX(0)'
  }
});
const FilterOverlay = styled(Box)({
  position: 'fixed',
  zIndex: '2',
  width: '100vw',
  height: '100vh',
  top: '0',
  left: '0',
  background: 'transparent',
  display: 'none',
  '&.active': {
    background: '#000000c2',
    display: 'block'
  }
});

interface IFilter {
  children: React.ReactNode;
  open: boolean;
  toggleOpen: () => void;
}
export default function FilterAccount({ open, children, toggleOpen }: IFilter) {
  return (
    <Box>
      <Hidden mdUp>
        <FilterCollection className={open ? 'active' : ''}>
          <FilterBox onClick={toggleOpen}>
            <FilterAltIcon />
            Bộ lọc
          </FilterBox>
          {children}
        </FilterCollection>
        <FilterOverlay onClick={toggleOpen} className={open ? 'active' : ''} />
      </Hidden>
      <Hidden mdDown>{children}</Hidden>
    </Box>
  );
}
