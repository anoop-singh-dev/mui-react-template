import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Avatar,
  TablePagination,
} from "@mui/material";
import { Add, UploadFile, Download } from "@mui/icons-material";

// Sample data
const users = [
  {
    id: 1,
    name: "Alcides Antonio",
    email: "alcides.antonio@devias.io",
    location: "Madrid, Comunidad de Madrid, Spain",
    phone: "908-691-3242",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    joined: "Mar 8, 2024",
  },
  {
    id: 2,
    name: "Marcus Finn",
    email: "marcus.finn@devias.io",
    location: "Carson City, Nevada, USA",
    phone: "415-907-2647",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    joined: "Mar 8, 2024",
  },
  {
    id: 3,
    name: "Jie Yan",
    email: "jie.yan.song@devias.io",
    location: "North Canton, Ohio, USA",
    phone: "770-635-2682",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    joined: "Mar 8, 2024",
  },
  {
    id: 4,
    name: "Nasimiyu Danai",
    email: "nasimiyu.danai@devias.io",
    location: "Salt Lake City, Utah, USA",
    phone: "801-301-7894",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    joined: "Mar 8, 2024",
  },
  {
    id: 5,
    name: "Iulia Albu",
    email: "iulia.albu@devias.io",
    location: "Murray, Utah, USA",
    phone: "313-812-8947",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    joined: "Mar 8, 2024",
  },
  // You can add more mock users here
];

const User = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  // Filtered users
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handle Pagination
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card sx={{ mt: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Customers
        </Typography>

        {/* Import / Export Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <div>
            <Button startIcon={<UploadFile />}>Import</Button>
            <Button startIcon={<Download />} style={{ marginLeft: 8 }}>
              Export
            </Button>
          </div>
          <Button variant="contained" color="primary" startIcon={<Add />}>
            Add
          </Button>
        </div>

        {/* Search Bar */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: "16px" }}
        />

        {/* User Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Signed Up</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar src={user.avatar} style={{ marginRight: 8 }} />
                        {user.name}
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.location}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.joined}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[3, 5, 10]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  );
};

export default User;
