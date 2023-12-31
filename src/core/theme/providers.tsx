import React, { ReactNode } from "react";

import { ThemeContext } from "./contexts";

import { colors, text } from "~/ui/themes";

// Define the default theme
export const defaultTheme = {
  colors,
  text,
};

// Provider component that wraps your app and provides the theme context
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
}
