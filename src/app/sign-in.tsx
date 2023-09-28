import { SafeAreaView, StyleSheet } from "react-native";

import { SignIn } from "~/screens/signIn";

export default function Page() {
  return (
    <SafeAreaView style={styles.container}>
      <SignIn />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
