import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "~/core";
import { useAuth } from "~/core/auth";
import { Button } from "~/ui";

export default function SignIn() {
  const { signIn, isLoading } = useAuth();
  const { text } = useTheme();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          gap: 50,
        }}
      >
        <View
          style={{
            flex: 4,
            gap: 16,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Text style={text.giant}>Convenient task manager</Text>
          <Text style={text.body}>Keep healthy work-life balance!</Text>
        </View>

        <View
          style={{ flex: 1, paddingHorizontal: 40, justifyContent: "center" }}
        >
          <Button
            title="Sign In with Face ID"
            onPress={() => {
              signIn("user-session-2").then(() => {
                router.replace("/");
              });
            }}
            rightIcon={<Ionicons name="scan-circle" size={30} color="white" />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
