import { View, Animated, StyleSheet } from "react-native";

import { colors } from "~/ui";

export const RightActions = () => {
  return (
    <View style={styles.rightAction}>
      <Animated.Text style={styles.actionText}>Delete</Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rightAction: {
    backgroundColor: colors.red[500],
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    marginHorizontal: 10,
  },
});
