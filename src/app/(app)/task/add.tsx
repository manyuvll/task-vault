import { SafeAreaView, Text } from "react-native";

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
        ADD
      </Text>
    </SafeAreaView>
  );
}
