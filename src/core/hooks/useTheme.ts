import { useContext } from "react";

import { ThemeContext } from "../theme";

// Custom hook for accessing the theme context.
// In the context of this demo app, I haven't delved further into this feature.
// However, theoretically, you could manage both light and dark modes
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
