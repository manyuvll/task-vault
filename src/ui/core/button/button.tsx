import React, { useMemo } from "react";
import { Text, StyleSheet, Pressable } from "react-native";

import { Variant } from "~/types/ui/variant";
import { colors, shadows } from "~/ui/themes";

type ButtonProps = {
  onPress: () => void;
  title: string;
  variant?: Variant;
  rightIcon?: JSX.Element;
  disabled?: boolean;
};

export const Button = ({
  onPress,
  title,
  rightIcon,
  disabled,
  variant = "default",
}: ButtonProps) => {
  const styles = useMemo(
    () => getVariant(variant, disabled),
    [variant, disabled],
  );

  return (
    <Pressable style={styles.button} onPress={onPress} disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
      {rightIcon && rightIcon}
    </Pressable>
  );
};

const getVariant = (variant: Variant, disabled?: boolean) => {
  switch (variant) {
    case "error":
      return StyleSheet.create({
        button: {
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 99,
          backgroundColor: colors.red[500],

          shadowColor: colors.red[500],
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.43,
          shadowRadius: 9.51,

          elevation: 15,
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
    default:
      return StyleSheet.create({
        button: {
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 99,
          backgroundColor: disabled ? colors.slate[400] : colors.indigo[500],

          shadowColor: disabled ? colors.slate[400] : colors.indigo[500],
          ...shadows.default,
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
