import { useState } from 'react';
import { Menu, MenuItem, Divider, Box, Avatar, Typography, IconButton } from '@mui/material';
import { AiOutlineUser, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineCreditCard } from 'react-icons/md';

const AvatarMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Open menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* User Avatar (Click to Open Menu) */}
      <IconButton onClick={handleMenuOpen}>
        <Avatar alt="User" src="https://mui.com/static/images/avatar/1.jpg" />
      </IconButton>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { width: 220, padding: 1 },
        }}
      >
        {/* Profile Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
          <Avatar src="https://mui.com/static/images/avatar/1.jpg" />
          <Box sx={{ ml: 2 }}>
            <Typography fontWeight="bold">John Doe</Typography>
            <Typography variant="body2" color="gray">UI/UX Designer</Typography>
          </Box>
        </Box>
        <Divider />

        {/* Menu Items */}
        <MenuItem onClick={handleMenuClose}>
          <AiOutlineUser size={20} style={{ marginRight: 10 }} /> Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <FiEdit size={20} style={{ marginRight: 10 }} /> Edit Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <MdOutlineCreditCard size={20} style={{ marginRight: 10 }} /> Billing
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleMenuClose}>
          <AiOutlineSetting size={20} style={{ marginRight: 10 }} /> Settings
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'red' }}>
          <AiOutlineLogout size={20} style={{ marginRight: 10 }} /> Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default AvatarMenu;
