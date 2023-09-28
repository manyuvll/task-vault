import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { useAuth } from "~/core/auth";
import { store, persistor } from "~/core/store";
import { Add, Item } from "~/ui/core";
import { colors } from "~/ui/themes";

export default function AppLayout() {
  const { session } = useAuth();

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Tabs
          backBehavior="history"
          sceneContainerStyle={{ backgroundColor: colors.indigo[100] }}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarShowLabel: false,
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
            // ne to clear params, else we'll go always in edit mode
            listeners={({ navigation }) => ({
              blur: () => navigation.setParams({ task: undefined }),
            })}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ focused }: { focused: boolean }) => (
                <Add focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="task/edit"
            // ne to clear params, else we'll go always in edit mode
            listeners={({ navigation }) => ({
              blur: () => navigation.setParams({ task: undefined }),
            })}
            options={{
              href: null,
              tabBarShowLabel: false,
              tabBarIcon: ({ focused }: { focused: boolean }) => (
                <Add focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="task/list"
            options={{
              tabBarShowLabel: false,
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
      </PersistGate>
    </Provider>
  );
}
