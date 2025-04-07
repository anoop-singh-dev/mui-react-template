import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, useTheme } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ListIcon from '@mui/icons-material/List';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logoipsum.svg';

interface SidebarProps {
  sidebarOpen: boolean;
}

const Sidebar = ({ sidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const theme = useTheme(); // 🌙 Get current theme

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'User', icon: <PersonIcon />, path: '/user' },
    { text: 'List', icon: <ListIcon />, path: '/userlist' },
    { text: 'Kanban', icon: <ViewKanbanIcon  />, path: '/kanban' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarOpen ? 240 : 60,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        overflowX: 'hidden',
        '& .MuiDrawer-paper': {
          width: sidebarOpen ? 240 : 60,
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          overflowY: 'auto',
          position: 'relative',
          backgroundColor: theme.palette.background.default, // ✅ Dynamic bg
          borderRight: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.primary, // ✅ Text adapts
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
          borderBottom: `1px solid ${theme.palette.divider}`,
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
                backgroundColor: isActive ? theme.palette.action.selected : 'transparent',
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
                borderRadius: '4px',
                mb: 1,
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              {sidebarOpen && (
                <ListItemText
                  primary={item.text}
                  sx={{
                    color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                  }}
                />
              )}
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
