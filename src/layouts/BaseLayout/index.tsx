import Footer from '@/components/Footer';
import HeaderWrapper from '@/components/Header/HeaderWrapper';
import { Box, styled } from '@mui/material';
import PropTypes from 'prop-types';
import { FC, ReactNode } from 'react';

interface BaseLayoutProps {
  children?: ReactNode;
}

const FullBG = styled(Box)({
  background: `#fff`,
  overflow: 'auto',
  flex: '1',
  overflowX: 'hidden',
  backgroundAttachment: 'fixed'
});

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <Box>
      <HeaderWrapper />
      <FullBG>
        {children} <Footer />
      </FullBG>
    </Box>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node
};

export default BaseLayout;
