import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { ItemProps } from "./types";

import { colors } from "~/ui/themes";

const Item = ({ label, icon, focused }: ItemProps) => {
  return (
    <View style={styles(focused).container}>
      {icon}
      <Text style={styles(focused).text}>{label}</Text>
    </View>
  );
};

export { Item };

const styles = (focused: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      borderTopWidth: 2,
      borderTopColor: focused ? colors.indigo[500] : "transparent",
    },
    text: {
      fontFamily: "Roboto",
      fontSize: 12,
      color: focused ? colors.indigo[500] : colors.slate[500],
    },
  });
