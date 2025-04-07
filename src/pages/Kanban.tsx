import React, { useState } from 'react';
import { 
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  IconButton,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  TablePagination
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

interface BacklogItem {
  id: string;
  title: string;
  state: 'New' | 'Closed' | 'Resolved';
  assignedTo: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  type: 'doc' | 'project' | 'subtask';
  parentId?: string;
}

const BacklogTable: React.FC = () => {
  const [tabValue, setTabValue] = useState(1); // Default to "Backlogs" tab
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({
    '2647': true
  });
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Sample data - you can expand this
  const backlogItems: BacklogItem[] = [
    { id: '2647', title: 'School Management Backend', state: 'Closed', assignedTo: 'Maddison Wilber', priority: 'Low', dueDate: '27 Feb 2023', type: 'project' },
    { id: '3542', title: 'Online fees payment & instant announcements', state: 'New', assignedTo: 'Barney Thea', priority: 'Low', dueDate: '3 Feb 2023', type: 'subtask', parentId: '2647' },
    { id: '8903', title: 'Attendance checking & homework details', state: 'New', assignedTo: 'Barney Thea', priority: 'Low', dueDate: '4 Mar 2023', type: 'subtask', parentId: '2647' },
    { id: '1381', title: 'Admission, Staff & Schedule management', state: 'New', assignedTo: 'John Doe', priority: 'High', dueDate: '23 Feb 2023', type: 'subtask', parentId: '2647' },
    { id: '7833', title: 'Inventory Implementation & Design', state: 'New', assignedTo: 'John Doe', priority: 'High', dueDate: '23 Feb 2023', type: 'project' },
    { id: '6940', title: 'Theme migration from v4 to v5', state: 'Closed', assignedTo: 'John Doe', priority: 'Medium', dueDate: '15 Feb 2023', type: 'project' },
    { id: '4656', title: 'Lunch Beauty Application', state: 'Resolved', assignedTo: 'Barney Thea', priority: 'Low', dueDate: '7 Feb 2023', type: 'project' },
    { id: '9234', title: 'User Authentication Module', state: 'New', assignedTo: 'Maddison Wilber', priority: 'High', dueDate: '12 Mar 2023', type: 'project' },
    { id: '5721', title: 'Dashboard Analytics', state: 'New', assignedTo: 'John Doe', priority: 'Medium', dueDate: '18 Mar 2023', type: 'project' },
    { id: '6812', title: 'Mobile App Integration', state: 'Resolved', assignedTo: 'Barney Thea', priority: 'Medium', dueDate: '21 Mar 2023', type: 'project' }
  ];

  const handleTabChange = (newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleRowExpand = (id: string) => {
    setExpandedRows({
      ...expandedRows,
      [id]: !expandedRows[id]
    });
  };

  const getIconForType = (type: string) => {
    if (type === 'project') {
      return <FolderOutlinedIcon fontSize="small" sx={{ color: '#6366F1' }} />;
    } else if (type === 'subtask') {
      return <InsertDriveFileOutlinedIcon fontSize="small" sx={{ color: '#0EA5E9' }} />;
    }
    return <AutoStoriesOutlinedIcon fontSize="small" sx={{ color: '#0EA5E9' }} />;
  };


  // Calculate total items count for pagination
  const projectCount = backlogItems.filter(item => item.type === 'project').length;

  // Handle pagination changes
  const handleChangePage = ( newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get paginated projects
  const paginatedProjects = backlogItems
    .filter(item => item.type === 'project')
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Create a list of items to display that includes paginated projects and their subtasks if expanded
  const itemsToDisplay = backlogItems.filter(item => {
    // Include project if it's in the paginated set
    if (item.type === 'project') {
      return paginatedProjects.some(project => project.id === item.id);
    }
    
    // Include subtask if its parent is in the paginated set and expanded
    if (item.parentId) {
      return paginatedProjects.some(project => project.id === item.parentId) && expandedRows[item.parentId];
    }
    
    return false;
  });

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="view options">
          <Tab label="Backlogs" value={1} sx={{ textTransform: 'none', color: '#3B82F6', borderBottom: '2px solid #3B82F6' }} />
        </Tabs>
      </Box>
      
      <Box sx={{ mt: 2, mb: 2 }}>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          sx={{ 
            bgcolor: '#7C3AED', 
            borderRadius: '0.5rem',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: '#6D28D9'
            }
          }}
        >
          Add
        </Button>
      </Box>
      
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table sx={{ minWidth: 650 }} aria-label="backlog table">
          <TableHead>
            <TableRow sx={{ bgcolor: 'transparent' }}>
              <TableCell padding="checkbox" />
              <TableCell>Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell />
              <TableCell>State</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemsToDisplay.map((item) => (
              <TableRow
                key={item.id}
                sx={{ 
                  '&:nth-of-type(odd)': { bgcolor: item.type === 'project' ? 'rgba(219, 234, 254, 0.3)' : 'transparent' },
                  '&:last-child td, &:last-child th': { border: 0 },
                  height: '60px'
                }}
              >
                <TableCell padding="checkbox">
                  {item.type === 'project' ? (
                    <IconButton size="small" onClick={() => toggleRowExpand(item.id)}>
                      {expandedRows[item.id] ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                    </IconButton>
                  ) : (
                    <CheckCircleOutlineIcon fontSize="small" sx={{ color: '#CBD5E1', ml: 1 }} />
                  )}
                </TableCell>
                <TableCell>
                  {getIconForType(item.type)} {item.id}
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={handleMenuClick}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      color: item.state === 'New' ? '#EA580C' : 
                             item.state === 'Closed' ? '#64748B' : '#10B981'
                    }}
                  >
                    {item.state}
                  </Typography>
                </TableCell>
                <TableCell>{item.assignedTo}</TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      color: item.priority === 'High' ? '#DC2626' : 
                             item.priority === 'Medium' ? '#F59E0B' : '#64748B'
                    }}
                  >
                    {item.priority}
                  </Typography>
                </TableCell>
                <TableCell>{item.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <TablePagination
          component="div"
          count={projectCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{
            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
              margin: 0,
            }
          }}
        />
      </TableContainer>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
        <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
        <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
        <MenuItem onClick={handleMenuClose}>Add Subtask</MenuItem>
      </Menu>
    </Box>
  );
};

export default BacklogTable;