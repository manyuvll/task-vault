import React from "react";
import {
  TextInputProps,
  TextInput,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors, text } from "~/ui/themes";

export const Input = ({
  label,
  requiredMessage,
  ...rest
}: TextInputProps & { label: string; requiredMessage?: string | null }) => {
  return (
    <View>
      <View style={styles(rest.multiline).labelContainer}>
        <Text style={styles().label}>{label}</Text>
        {requiredMessage && (
          <Text style={styles(rest.multiline).error}>*{requiredMessage}</Text>
        )}
      </View>

      <TextInput style={styles(rest.multiline).input} {...rest} />
    </View>
  );
};

const styles = (multiline?: boolean) =>
  StyleSheet.create({
    labelContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    label: {
      ...(text.body as object),
    },
    error: {
      ...(text.validationError as object),
    },
    input: {
      backgroundColor: colors.blue[50],
      borderRadius: 10,
      color: colors.black,
      padding: 10,
      height: multiline ? 170 : "auto",
      maxHeight: multiline ? 170 : "auto",
    },
  });
