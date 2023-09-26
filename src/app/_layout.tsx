import { Slot } from "expo-router";
import React from "react";

import { ThemeProvider } from "~/core";
import { AuthProvider } from "~/core/auth";

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <ThemeProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </ThemeProvider>
  );
}
