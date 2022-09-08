import SidebarLayout from '@/layouts/SidebarLayout';
import React from 'react';

function TagManager() {
  return <div>TagManager</div>;
}

TagManager.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default TagManager;
