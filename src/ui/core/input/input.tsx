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
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {requiredMessage && (
          <Text style={styles.error}>*{requiredMessage}</Text>
        )}
      </View>

      <TextInput style={styles.input} {...rest} />
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
});
