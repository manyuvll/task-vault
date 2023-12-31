import { StyleProp, TextStyle } from "react-native";

import { colors } from "./colors";

export const text = {
  giant: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: "700",
    color: colors.slate[700],
  } as StyleProp<TextStyle>,
  pageHeading: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "700",
    color: colors.slate[700],
  } as StyleProp<TextStyle>,
  heading: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "500",
    color: colors.slate[700],
  } as StyleProp<TextStyle>,
  body: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.4,
    fontWeight: "600",
    color: colors.slate[500],
  } as StyleProp<TextStyle>,
  validationError: {
    fontFamily: "Roboto",
    fontSize: 12,
    lineHeight: 24,
    letterSpacing: 0.4,
    fontWeight: "600",
    color: colors.red[500],
  } as StyleProp<TextStyle>,
};
