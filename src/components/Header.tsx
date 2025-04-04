import { AppBar, Toolbar, IconButton, Box, useTheme } from '@mui/material';
import { RiMenuFold4Fill, RiMenuFold3Line } from 'react-icons/ri';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AvatarMenu from './AvatarMenu';
import { useThemeContext } from '../context/ThemeContext'; // make sure path is correct

interface HeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header = ({ sidebarOpen, toggleSidebar }: HeaderProps) => {
  const { toggleTheme, darkMode } = useThemeContext();
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: sidebarOpen ? `calc(100% - 240px)` : `calc(100% - 60px)`,
        ml: sidebarOpen ? '240px' : '60px',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        maxWidth: '100%',
        overflowX: 'hidden',
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
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

        {/* Theme Toggle */}
        <IconButton onClick={toggleTheme} color="inherit">
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

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
