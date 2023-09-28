import { Dimensions, Platform, StatusBar, StyleSheet } from "react-native";

export const windowWidth = Dimensions.get("window").width;
export const safeArea = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
