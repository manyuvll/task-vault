import { Text, View } from "react-native";

import { useAuth } from "~/core/auth";

export default function Page() {
  const { signOut } = useAuth();
  return (
    <View>
      <Text
        onPress={() => {
          signOut();
        }}
      >
        LIST
      </Text>
    </View>
  );
}
