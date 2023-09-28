import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

import { HeaderProps } from "./types";

import { colors, shadows, text } from "~/ui/themes";

export const Header = ({ title }: HeaderProps) => {
  const router = useRouter();

  const handleOnGoBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleOnGoBack}>
          <Ionicons name="arrow-back" size={30} />
        </Pressable>
      </View>

      <View
        style={{
          justifyContent: "center",
        }}
      >
        <Text style={{ ...(text.pageHeading as object) }}>{title}</Text>
      </View>
      <View style={styles.spacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    height: 40,
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: 6,
    padding: 2,
    paddingHorizontal: 6,
    width: 41,
    shadowColor: colors.indigo[500],
    ...shadows.sm,
  },
  spacer: {
    width: 40,
  },
});
