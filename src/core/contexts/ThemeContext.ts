import { createContext } from "react";

import { defaultTheme } from "../providers";

type ThemeType = typeof defaultTheme;

// Create a context for the theme
export const ThemeContext = createContext<ThemeType | undefined>(undefined);
