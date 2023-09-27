import "react-native-gesture-handler";

import { Slot } from "expo-router";
import React from "react";
import { RootSiblingParent } from "react-native-root-siblings";

import { ThemeProvider } from "~/core";
import { AuthProvider } from "~/core/auth";

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
