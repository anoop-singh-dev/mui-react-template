import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Select,
  MenuItem as SelectItem,
  Checkbox
} from "@mui/material";
import { MoreVert, Edit, Delete } from "@mui/icons-material";

const users = [
  {
    name: "Angelique Morse",
    email: "benny89@yahoo.com",
    phone: "+46 8 123 456",
    company: "Wuckert Inc",
    role: "Content Creator",
    status: "Banned",
    avatar: "/avatars/01.png"
  },
  {
    name: "Ariana Lang",
    email: "avery43@hotmail.com",
    phone: "+54 11 1234-5678",
    company: "Feest Group",
    role: "IT Administrator",
    status: "Pending",
    avatar: "/avatars/02.png"
  },
  {
    name: "Aspen Schmitt",
    email: "mireya13@hotmail.com",
    phone: "+34 91 123 4567",
    company: "Kihn, Marquardt and Crist",
    role: "Financial Planner",
    status: "Banned",
    avatar: "/avatars/03.png"
  },
  {
    name: "Brycen Jimenez",
    email: "tyrel.greenholt@gmail.com",
    phone: "+52 55 1234 5678",
    company: "Rempel, Hand and Herzog",
    role: "HR Recruiter",
    status: "Active",
    avatar: "/avatars/04.png"
  },
  {
    name: "Chase Day",
    email: "joana.simonis84@gmail.com",
    phone: "+86 10 1234 5678",
    company: "Mraz, Donnelly and Collins",
    role: "Graphic Designer",
    status: "Banned",
    avatar: "/avatars/05.png"
  },
];

const statusStyles:any = {
  Active: { backgroundColor: "#DCFCE7", color: "#15803D" },
  Pending: { backgroundColor: "#FEF3C7", color: "#B45309" },
  Banned: { backgroundColor: "#FECACA", color: "#B91C1C" },
  Rejected: { backgroundColor: "#E5E7EB", color: "#374151" }
};

const statusTabs = ["All", "Active", "Pending", "Banned", "Rejected"];
const tabColors:any = {
  All: { bg: "#E5E7EB", color: "#1F2937" },
  Active: { bg: "#BBF7D0", color: "#15803D" },
  Pending: { bg: "#FDE68A", color: "#B45309" },
  Banned: { bg: "#FCA5A5", color: "#B91C1C" },
  Rejected: { bg: "#D1D5DB", color: "#374151" }
};

export default function UserList() {
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);
  const [roleFilter, setRoleFilter] = useState("");
  const [tabValue, setTabValue] = useState("All");

  const handleMenuClick = (event:any, index:any) => {
    setAnchorEl(event.currentTarget);
    setMenuIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuIndex(null);
  };

  const clearFilters = () => {
    setSearch("");
    setRoleFilter("");
    setTabValue("All");
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    const matchesTab = tabValue === "All" || user.status === tabValue;
    return matchesSearch && matchesRole && matchesTab;
  });

  const uniqueRoles = [...new Set(users.map((u) => u.role))];

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          List
        </Typography>
        <Button variant="contained">+ New user</Button>
      </Box>

      {/* Tabs */}
      <Box display="flex" gap={2} mb={3}>
        {statusTabs.map((status) => {
          const count =
            status === "All"
              ? users.length
              : users.filter((u) => u.status === status).length;
          const active = tabValue === status;
          return (
            <Button
              key={status}
              onClick={() => setTabValue(status)}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                fontSize: "0.9rem",
                color: active ? "#0F172A" : "#6B7280",
                borderBottom: active ? "2px solid #0F172A" : "none",
                borderRadius: 0,
                paddingBottom: "6px",
                minWidth: "auto",
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                {status}
                <Box
                  sx={{
                    backgroundColor: tabColors[status].bg,
                    color: tabColors[status].color,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    px: 1,
                    py: "2px",
                    borderRadius: 1,
                  }}
                >
                  {count}
                </Box>
              </Box>
            </Button>
          );
        })}
      </Box>

      {/* Filters */}
      <Box display="flex" gap={2} mb={1}>
        <Select
          displayEmpty
          size="small"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          sx={{ width: 200 }}
        >
          <SelectItem value="">Role</SelectItem>
          {uniqueRoles.map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </Select>

        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
      </Box>

      {(tabValue !== "All" || roleFilter || search) && (
        <Box display="flex" alignItems="center" gap={2} mb={2} flexWrap="wrap">
          <Typography variant="body2" fontWeight="500">
            {filteredUsers.length} results found
          </Typography>

          {tabValue !== "All" && (
            <Chip
              label={<Box component="span" display="flex" alignItems="center"><strong>Status:</strong>&nbsp;{tabValue}</Box>}
              onDelete={() => setTabValue("All")}
              variant="outlined"
              size="small"
              sx={{ borderRadius: "8px" }}
            />
          )}

          {roleFilter && (
            <Chip
              label={<Box component="span" display="flex" alignItems="center"><strong>Role:</strong>&nbsp;{roleFilter}</Box>}
              onDelete={() => setRoleFilter("")}
              variant="outlined"
              size="small"
              sx={{ borderRadius: "8px" }}
            />
          )}

          <Button
            onClick={clearFilters}
            startIcon={<Delete />}
            size="small"
            sx={{ color: "#EF4444", textTransform: "none", fontWeight: "500" }}
          >
            Clear
          </Button>
        </Box>
      )}


      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone number</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={index} hover>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar src={user.avatar} alt={user.name} />
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {user.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.company}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    sx={{
                      ...statusStyles[user.status],
                      fontSize: "0.75rem",
                      height: 24,
                    }}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton>
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton onClick={(e) => handleMenuClick(e, index)}>
                    <MoreVert fontSize="small" />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={menuIndex === index}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleMenuClose}>View</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
