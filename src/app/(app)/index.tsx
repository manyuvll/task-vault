import { router } from "expo-router";
import { Button, Text, View } from "react-native";

import signIn from "../sign-in";

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
        HOME
      </Text>
    </View>
  );
}
