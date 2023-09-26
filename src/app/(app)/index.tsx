import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "~/core/auth";

export default function Page() {
  const { signOut } = useAuth();
  return (
    <SafeAreaView>
      <Text
        onPress={() => {
          signOut();
        }}
      >
        HOME
      </Text>
    </SafeAreaView>
  );
}
