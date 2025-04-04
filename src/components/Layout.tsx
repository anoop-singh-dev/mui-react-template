import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  children: React.ReactNode;
}

const Layout = ({ sidebarOpen, toggleSidebar, children }: LayoutProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar Component */}
      <Sidebar sidebarOpen={sidebarOpen} />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1 }}>
        <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <Box sx={{ marginTop: '64px', padding: '20px' }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
