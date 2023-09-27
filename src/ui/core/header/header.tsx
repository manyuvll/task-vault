import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { View, Pressable, Text } from "react-native";

import { HeaderProps } from "./types";

import { colors, shadows, text } from "~/ui/themes";

export const Header = ({ title }: HeaderProps) => {
  const router = useRouter();

  const handleOnGoBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 20,
        justifyContent: "space-between",
        height: 40,
        marginBottom: 20,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.white,
          borderRadius: 6,
          padding: 2,
          paddingHorizontal: 6,
          width: 41,
          shadowColor: colors.indigo[500],
          ...shadows.sm,
        }}
      >
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
      <View
        style={{
          width: 40,
        }}
      />
    </View>
  );
};
