import "react-native-gesture-handler";

import { Slot } from "expo-router";
import React from "react";
import { RootSiblingParent } from "react-native-root-siblings";

import { AuthProvider } from "~/core/auth";
import { ThemeProvider } from "~/core/theme";

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <RootSiblingParent>
      <ThemeProvider>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </ThemeProvider>
    </RootSiblingParent>
  );
}
