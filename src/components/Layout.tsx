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
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} />

      {/* Main content area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header (fixed height) */}
        <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Page content with top margin to avoid header overlap */}
        <Box
          sx={{
            flexGrow: 1,
            padding: '20px',
            marginTop: '64px', // adjust based on your Header height
            overflowY: 'auto'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
