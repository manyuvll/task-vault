import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, Slot, Tabs } from "expo-router";
import React from "react";
import { Platform, SafeAreaView, View } from "react-native";

import Page from ".";

import { useAuth } from "~/core/auth";
import { Item, Navbar, colors, shadows } from "~/ui";
import { NavbarItem } from "~/ui/core/navbar/navbarItem";

export default function AppLayout() {
  const { session } = useAuth();

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      sceneContainerStyle={{ backgroundColor: colors.indigo[100] }}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <Item
                label="home"
                focused={focused}
                icon={
                  <Ionicons
                    name="home-outline"
                    // style={{ color: colors.indigo[200] }}
                    size={20}
                  />
                }
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="task/add"
        options={{
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View
                style={{
                  backgroundColor: colors.indigo[100],
                  borderColor: colors.indigo[100],
                  borderWidth: 10,
                  width: 140,
                  borderRadius: 50,
                  top: Platform.OS === "ios" ? -10 : -20,
                }}
              >
                <View
                  style={{
                    width: 120,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.indigo[500],
                    height: Platform.OS === "ios" ? 50 : 60,
                    borderRadius: Platform.OS === "ios" ? 25 : 30,
                    shadowColor: colors.indigo[500],
                    ...shadows.default,
                  }}
                >
                  <Ionicons
                    name="add"
                    style={{ color: colors.white }}
                    size={30}
                  />
                </View>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="task/list"
        options={{
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <Item
                label="List"
                focused={focused}
                icon={
                  <Ionicons
                    name="list-circle-outline"
                    // style={{ color: colors.indigo[200] }}
                    size={20}
                  />
                }
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
