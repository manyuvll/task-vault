import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "~/ui/themes";

export const NoData = ({ label }: { label: string }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="library-outline" size={30} color={colors.indigo[500]} />
      <Text style={styles.noData}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    alignItems: "center",
    gap: 10,
    borderRadius: 8,
    padding: 16,
    margin: 3,
    paddingHorizontal: 13,
  },
  noData: {
    fontWeight: "700",
    color: colors.indigo[500],
    flexWrap: "wrap",
  },
});
