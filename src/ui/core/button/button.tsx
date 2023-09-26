import React, { useMemo } from "react";
import { Text, StyleSheet, Pressable } from "react-native";

import { Variant } from "~/types/ui/variant";
import { colors } from "~/ui/themes";

type ButtonProps = {
  onPress: () => void;
  title: string;
  variant?: Variant;
  rightIcon?: JSX.Element;
};

export const Button = ({
  onPress,
  title,
  rightIcon,
  variant = "default",
}: ButtonProps) => {
  const styles = useMemo(() => getVariant(variant), [variant]);

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
      {rightIcon && rightIcon}
    </Pressable>
  );
};

const getVariant = (variant: Variant) => {
  switch (variant) {
    default:
      return StyleSheet.create({
        button: {
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 14,
          elevation: 3,
          backgroundColor: colors.blue[500],
        },
        text: {
          width: "auto",
          fontSize: 16,
          lineHeight: 21,
          fontWeight: "bold",
          letterSpacing: 0.25,
          color: "white",
        },
      });
  }
};
