import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, Slot, Tabs } from "expo-router";
import React from "react";
import { Platform, SafeAreaView, View } from "react-native";

import Page from ".";

import { useAuth } from "~/core/auth";
import { Add, Item, colors, shadows } from "~/ui";

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
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Item
              label="home"
              focused={focused}
              icon={
                <Ionicons
                  name="home-outline"
                  size={20}
                  style={{
                    color: focused ? colors.indigo[500] : colors.slate[500],
                  }}
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="task/add"
        options={{
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Add focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="task/list"
        options={{
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Item
              label="List"
              focused={focused}
              icon={
                <Ionicons
                  name="list-circle-outline"
                  size={20}
                  style={{
                    color: focused ? colors.indigo[500] : colors.slate[500],
                  }}
                />
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}
