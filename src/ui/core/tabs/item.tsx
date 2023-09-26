import React from "react";
import { Text, View } from "react-native";

import { ItemProps } from "./types";

import { colors } from "~/ui/themes";

const Item = ({ label, icon, focused }: ItemProps) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 16,
        borderTopWidth: 2,
        borderTopColor: focused ? colors.indigo[500] : "transparent",
      }}
    >
      {icon}
      <Text
        style={{
          fontFamily: "Roboto",
          fontSize: 12,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export { Item };
