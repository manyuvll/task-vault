import { Animated, StyleSheet, View } from "react-native";

import { colors } from "~/ui/themes";

export const LeftActions = () => {
  return (
    <View style={styles.leftAction}>
      <Animated.Text style={styles.actionText}>Edit</Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  leftAction: {
    backgroundColor: colors.indigo[500],
    justifyContent: "center",
    borderRadius: 3,
    flex: 1,
  },

  actionText: {
    color: "#fff",
    fontWeight: "600",
    marginHorizontal: 10,
  },
});
