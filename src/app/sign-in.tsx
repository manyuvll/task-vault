import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SignInIllustration from "../../assets/sign-in-illustration-2.svg";

import { useBiometricAuth, useTheme } from "~/core";
import { useAuth } from "~/core/auth";
import { Button, colors } from "~/ui";

export default function SignIn() {
  const { signIn } = useAuth();
  const { text } = useTheme();
  const [isBioAuthAvailable, bioAuth] = useBiometricAuth();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SignInIllustration
        width={430}
        height={500}
        style={{ position: "absolute", top: 60 }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          gap: 40,
        }}
      >
        <View
          style={{
            flex: 4,
            gap: 8,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Text style={{ ...(text.giant as object) }}>
            Innovative {"\n"}Task{" "}
            <Text style={{ color: colors.indigo[500] }}>Vault</Text>
          </Text>
          <Text style={text.body}>Keep your life goals secure!</Text>
        </View>

        <View
          style={{ flex: 1, paddingHorizontal: 34, justifyContent: "center" }}
        >
          <Button
            title="Sign In with Face ID"
            onPress={async () => {
              if (isBioAuthAvailable) {
                bioAuth().then((biometricResult) => {
                  if (biometricResult.success) {
                    signIn("user-session-2").then(() => {
                      router.replace("/");
                    });
                  }
                });
              }
            }}
            rightIcon={<Ionicons name="scan-circle" size={30} color="white" />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
