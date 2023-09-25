import { createContext } from "react";

import { defaultTheme } from "./ThemeProvider";

type ThemeType = typeof defaultTheme;

// Create a context for the theme
export const ThemeContext = createContext<ThemeType | undefined>(undefined);
