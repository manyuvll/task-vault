import { SafeAreaView, Text } from "react-native";

import { useAuth } from "~/core/auth";
import { Header } from "~/ui";

export default function Page() {
  const { signOut } = useAuth();
  return (
    <SafeAreaView>
      <Header title="Task List" />

      <Text
        onPress={() => {
          signOut();
        }}
      >
        LIST
      </Text>
    </SafeAreaView>
  );
}
