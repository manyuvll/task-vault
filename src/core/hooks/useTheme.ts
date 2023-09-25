import { useContext } from "react";

import { ThemeContext } from "../theme";

export // Custom hook to access the theme context
function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
