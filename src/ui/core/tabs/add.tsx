import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Platform, View } from "react-native";

import { AddProps } from "./types";

import { colors, shadows } from "~/ui/themes";

const Add = ({ focused }: AddProps) => (
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
      <Ionicons name="add" style={{ color: colors.white }} size={30} />
    </View>
  </View>
);

export { Add };
