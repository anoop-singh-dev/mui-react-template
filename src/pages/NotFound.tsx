import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotFoundImage from "../assets/404.svg"; // Correct path

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        bgcolor: "#f9f9f9",
      }}
    >
      {/* 404 Image */}
      <img
        src={NotFoundImage} // Using imported SVG
        alt="404 Not Found"
        style={{ width: "300px", marginBottom: "20px" }}
      />

      {/* Title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        404: The page you are looking for isn't here
      </Typography>

      {/* Subtitle */}
      <Typography variant="body1" color="textSecondary" mb={3}>
        You either tried some shady route or you came here by mistake. 
        Try using the navigation to get back.
      </Typography>

      {/* Button to navigate home */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ textTransform: "none", fontWeight: "bold", px: 3 }}
      >
        ⬅ Go back to home
      </Button>
    </Box>
  );
};

export default NotFound;
