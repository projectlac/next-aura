import { useRouter } from 'next/router';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useAuth } from './AuthGuard';
type ISidebarContext = {
  sidebarToggle: any;
  toggleSidebar: () => void;
  closeSidebar: () => void;
};

export const SidebarContext = createContext<ISidebarContext>(
  {} as ISidebarContext
);

type Props = {
  children: ReactNode;
};

export function SidebarProvider({ children }: Props) {
  const { isAuthenticated, user } = useAuth();
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };
  const route = useRouter();
  useEffect(() => {
    const check = () => {
      if (!isAuthenticated && route.pathname !== '/login') {
        window.location.href = '/login';
      }
      if (isAuthenticated && user.role === 'USER') {
        window.location.href = '/';
      }
    };
    check();
  }, [route.pathname]);
  const closeSidebar = () => {
    setSidebarToggle(false);
  };

  return (
    <SidebarContext.Provider
      value={{ sidebarToggle, toggleSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
