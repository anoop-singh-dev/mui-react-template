import { createContext, useContext } from "react";

interface ThemeContextProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

// ✅ Correctly exporting ThemeContext
export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
