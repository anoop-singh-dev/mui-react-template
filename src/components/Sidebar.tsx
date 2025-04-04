import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logoipsum.svg';

interface SidebarProps {
  sidebarOpen: boolean;
}

const Sidebar = ({ sidebarOpen }: SidebarProps) => {
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'User', icon: <PersonIcon />, path: '/user' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarOpen ? 240 : 60,
        flexShrink: 0,
        whiteSpace: 'nowrap', // Prevent content from breaking
        overflowX: 'hidden', // Ensure no horizontal scroll
        '& .MuiDrawer-paper': {
          width: sidebarOpen ? 240 : 60,
          transition: 'width 0.3s ease',
          overflowX: 'hidden', // Prevents scroll when reopening
          overflowY: 'auto', // Allows scrolling vertically
          position: 'relative', // Fix width calculations
          backgroundColor: '#fff',
          borderRight: '1px solid #e0e0e0',
        },
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 64,
          p: 1,
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        {sidebarOpen ? (
          <img src={logo} alt="Logo" style={{ width: 120, height: 'auto' }} />
        ) : (
          <img src={logo} alt="Logo" style={{ width: 30, height: 30 }} />
        )}
      </Box>

      {/* Menu List */}
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                backgroundColor: isActive ? '#f0f0f0' : 'transparent',
                '&:hover': { backgroundColor: '#e0e0e0' },
                borderRadius: '4px',
                mb: 1,
              }}
            >
              <ListItemIcon sx={{ color: isActive ? '#2962FF' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              {sidebarOpen && (
                <ListItemText primary={item.text} sx={{ color: isActive ? '#2962FF' : 'inherit' }} />
              )}
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
