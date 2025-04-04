import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { RiMenuFold4Fill, RiMenuFold3Line } from 'react-icons/ri';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AvatarMenu from './AvatarMenu';

interface HeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header = ({ sidebarOpen, toggleSidebar }: HeaderProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: sidebarOpen ? `calc(100% - 240px)` : `calc(100% - 60px)`,
        ml: sidebarOpen ? '240px' : '60px',
        backgroundColor: '#fff',
        maxWidth: '100%',                // ✅ Prevent accidental overflow
        overflowX: 'hidden',   
        boxShadow: 'none',
        borderBottom: '1px solid #e0e0e0',
        transition: 'width 0.3s ease, margin-left 0.3s ease',
        zIndex: 1201,
      }}
    >
      <Toolbar>
        {/* Toggle Sidebar Button */}
        <IconButton onClick={toggleSidebar} edge="start">
          {sidebarOpen ? <RiMenuFold3Line size={24} /> : <RiMenuFold4Fill size={24} />}
        </IconButton>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Notifications */}
        <IconButton>
          <NotificationsIcon />
        </IconButton>

        {/* Avatar Menu */}
        <AvatarMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
