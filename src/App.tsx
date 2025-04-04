import { useState, useMemo } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import AppRoutes from "./routes/Routes";
import { ThemeContext } from "./context/ThemeContext";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", (!prev).toString());
      return !prev;
    });
  };

  // Theme Configuration
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ toggleTheme, darkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Applies global theme styles */}
        <AppRoutes sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
