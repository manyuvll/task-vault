import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { bioAuthTypeToLabel } from "./helpers";
import SignInIllustration from "../../../assets/sign-in-illustration-2.svg";

import { useAuth } from "~/core/auth";
import { useTheme, useBiometricAuth } from "~/core/hooks";
import { Button } from "~/ui/core";
import { colors, windowWidth } from "~/ui/themes";

export const SignIn = () => {
  const { signIn } = useAuth();
  const { text } = useTheme();
  const [availableBiometricsAuth, bioAuth] = useBiometricAuth();

  return (
    <>
      <View style={styles.spacer} />
      <View style={styles.container}>
        <SignInIllustration style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={{ ...(text.giant as object) }}>
          Innovative {"\n"}Task <Text style={styles.vault}>Vault</Text>
        </Text>
        <Text style={text.body}>Keep your life goals secure!</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={bioAuthTypeToLabel(availableBiometricsAuth)}
          onPress={async () => {
            if (availableBiometricsAuth?.length) {
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
    </>
  );
};

const styles = StyleSheet.create({
  spacer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  vault: { color: colors.indigo[500] },
  image: {
    // scale picture based on screen
    maxWidth: windowWidth * 0.8,
    aspectRatio: 1,
  },
  buttonContainer: {
    paddingHorizontal: 34,
    justifyContent: "center",
    paddingVertical: 20,
  },
});
